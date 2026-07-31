const prisma = require('../config/prisma');

const applySubscription = async (data) => {
  const { name, surname, mail, telephone, idNo, taxNo, subscriptionId, meterType } = data;

  if (!name || !surname || !mail || !telephone || !subscriptionId) {
    throw new Error("Ad, soyad, e-posta, telefon ve abonelik numarası zorunludur.");
  }

  if (!idNo && !taxNo) {
    throw new Error("Lütfen TC Kimlik Numarası veya Vergi Numarasından en az birini giriniz.");
  }

  const existingSub = await prisma.subscription.findUnique({
    where: { id: subscriptionId },
    include: { meter: true }
  });

  if (!existingSub) {
    throw new Error("Girilen abonelik numarası bulunamadı.");
  }

  const newUser = await prisma.user.create({
    data: {
      name,
      surname,
      mail,
      telephone,
      idNo: idNo ? idNo : null,
      taxNo: taxNo ? taxNo : null, 
      subscriptionId: subscriptionId
    }
  });

  const updatedSubscription = await prisma.subscription.update({
    where: { id: subscriptionId },
    data: { 
      status: "PENDING",
      type: meterType || "EV" 
    },
    include: { owners: true, meter: true }
  });

  // 1. SubscriptionLog: Yeni Başvuru / Başlangıç Logu
  await prisma.subscriptionLog.create({
    data: {
      meterNo: existingSub.meterId || '',
      action: "NEW_START",
      userId: newUser.id,
      subscriptionId: subscriptionId,
      meterId: existingSub.meterId || null
    }
  });

  return {
    user: newUser,
    subscription: updatedSubscription
  };
};

const getAllSubscriptions = async () => {
  return await prisma.subscription.findMany({
    include: { owners: true, meter: true }
  });
};

const approveSubscription = async (subscriptionId, performedByWorkerId) => {
  const existingSub = await prisma.subscription.findUnique({
    where: { id: subscriptionId },
    include: { owners: true, meter: true }
  });

  if (!existingSub) {
    throw new Error(`ID'si ${subscriptionId} olan abonelik veritabanında bulunamadı!`);
  }

  const updatedSubscription = await prisma.subscription.update({
    where: { id: subscriptionId },
    data: { status: "ACTIVE" },
    include: { owners: true, meter: true }
  });

  // WorkerLog Kaydı
  if (performedByWorkerId) {
    await prisma.workerLog.create({
      data: {
        action: "APPROVE_SUBSCRIPTION",
        description: `${subscriptionId} numaralı abonelik onaylandı ve aktif hale getirildi.`,
        workerId: performedByWorkerId
      }
    });
  }

  // 2. SubscriptionLog: Abonelik Onay / Aktifleşme Logu
  const primaryOwner = existingSub.owners[0];
  await prisma.subscriptionLog.create({
    data: {
      meterNo: existingSub.meterId || '',
      action: "APPROVED",
      userId: primaryOwner ? primaryOwner.id : null,
      subscriptionId: subscriptionId,
      meterId: existingSub.meterId || null
    }
  });

  return updatedSubscription;
};

const cancelSubscription = async (subscriptionId, idNo) => {
  const sub = await prisma.subscription.findUnique({
    where: { id: subscriptionId },
    include: { owners: true, meter: true }
  });

  if (!sub) {
    throw new Error("Belirtilen numaraya ait abonelik bulunamadı.");
  }

  const owner = sub.owners.find(o => o.idNo === idNo || o.taxNo === idNo);
  if (!owner) {
    throw new Error("Girilen T.C. Kimlik / Vergi Numarası bu aboneliğin sahibi ile eşleşmiyor!");
  }

  // 1. Bağlı olan kullanıcının (User) subscriptionId alanını null yapıyoruz
  await prisma.user.updateMany({
    where: { subscriptionId: subscriptionId },
    data: { subscriptionId: null }
  });

  //2. Aboneliğin durumunu CANCELLED yapıp, tipini (type) null yapıyoruz
  const cancelledSub = await prisma.subscription.update({
    where: { id: subscriptionId },
    data: { 
      status: "CANCELLED",
      type: null 
    }
  });

  //3. SubscriptionLog: İptal Edildi Logu
  await prisma.subscriptionLog.create({
    data: {
      meterNo: sub.meterId || '',
      action: "CANCELLED",
      userId: owner.id,
      subscriptionId: subscriptionId,
      meterId: sub.meterId || null
    }
  });

  return cancelledSub;
};

const updateContactInfo = async (subscriptionId, idNo, mail, telephone) => {
  const sub = await prisma.subscription.findUnique({
    where: { id: subscriptionId },
    include: { owners: true }
  });

  if (!sub) {
    throw new Error("Abonelik bulunamadı.");
  }

  const owner = sub.owners.find(o => o.idNo === idNo || o.taxNo === idNo);
  if (!owner) {
    throw new Error("Girilen kimlik numarası bu aboneliğin sahibiyle eşleşmiyor.");
  }

  return await prisma.user.update({
    where: { id: owner.id },
    data: {
      ...(mail && { mail }),
      ...(telephone && { telephone })
    }
  });
};

const getSubscriptionLogs = async () => {
  return await prisma.subscriptionLog.findMany({
    include: {
      user: true,
      subscription: true,
      meter: true
    },
    orderBy: { changedAt: 'desc' }
  });
};
const getLogsBySubscriptionId = async (subscriptionId) => {
  return await prisma.subscriptionLog.findMany({
    where: { subscriptionId },
    include: {
      user: true,
      meter: true
    },
    orderBy: { changedAt: 'desc' }
  });
};
module.exports = { 
  applySubscription, 
  getAllSubscriptions, 
  approveSubscription, 
  cancelSubscription, 
  updateContactInfo, 
  getSubscriptionLogs,    
  getLogsBySubscriptionId
};