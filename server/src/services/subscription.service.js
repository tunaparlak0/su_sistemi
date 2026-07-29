const prisma = require('../config/prisma');

const applySubscription = async (data) => {
  const { name, surname, mail, telephone, idNo, taxNo, subscriptionId, meterType } = data;

  if (!name || !surname || !mail || !telephone || !subscriptionId) {
    throw new Error("Ad, soyad, e-posta, telefon ve abonelik numarası zorunludur.");
  }

  if (!idNo && !taxNo) {
    throw new Error("Lütfen TC Kimlik Numarası veya Vergi Numarasından en az birini giriniz.");
  }

  // Validasyon kontrolleri aynı kalabilir...
  const existingSub = await prisma.subscription.findUnique({
    where: { id: subscriptionId }
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

  // 📌 Abonelik güncellenirken frontend'den gelen 'meterType' değerini 'type' alanına yazıyoruz
  const updatedSubscription = await prisma.subscription.update({
    where: { id: subscriptionId },
    data: { 
      status: "PENDING",
      type: meterType || "EV" // Eğer gelmezse varsayılan "EV"
    },
    include: { owners: true }
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

const approveSubscription = async (subscriptionId) => {
  console.log("Onaylanmaya çalışılan Abonelik ID:", subscriptionId);

  const existingSub = await prisma.subscription.findUnique({
    where: { id: subscriptionId }
  });

  if (!existingSub) {
    throw new Error(`ID'si ${subscriptionId} olan abonelik veritabanında bulunamadı!`);
  }

  const updatedSubscription = await prisma.subscription.update({
    where: { id: subscriptionId },
    data: { status: "ACTIVE" },
    include: { owners: true, meter: true }
  });

  return updatedSubscription;
};

module.exports = { applySubscription, getAllSubscriptions, approveSubscription };