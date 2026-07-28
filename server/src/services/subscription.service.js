const prisma = require('../config/prisma');

const applySubscription = async (data) => {
  const { name, surname, mail, telephone, idNo, taxNo, subscriptionId } = data;

  if (!name || !surname || !mail || !telephone || !subscriptionId) {
    throw new Error("Ad, soyad, e-posta, telefon ve abonelik numarası zorunludur.");
  }

  // TC veya Vergi No kontrolü
  if (!idNo && !taxNo) {
    throw new Error("Lütfen TC Kimlik Numarası veya Vergi Numarasından en az birini giriniz.");
  }

  if (idNo) {
    const tcRegex = /^\d{11}$/;
    if (!tcRegex.test(idNo)) {
      throw new Error("TC Kimlik Numarası tam 11 haneli ve rakamlardan oluşmalıdır.");
    }
  }

  if (taxNo) {
    const taxRegex = /^\d{12}$/;
    if (!taxRegex.test(taxNo)) {
      throw new Error("Vergi Numarası tam 12 haneli ve rakamlardan oluşmalıdır.");
    }
  }

  const phoneRegex = /^05\d{9}$/;
  if (!phoneRegex.test(telephone)) {
    throw new Error("Geçerli bir Türkiye telefon numarası giriniz.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(mail)) {
    throw new Error("Lütfen geçerli bir e-posta adresi giriniz.");
  }

  const existingSub = await prisma.subscription.findUnique({
    where: { id: subscriptionId }
  });

  if (!existingSub) {
    throw new Error("Girilen abonelik numarası bulunamadı.");
  }

  // 📌 Kullanıcıyı oluştururken idNo ve taxNo değerlerini güvenli ekliyoruz
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
    data: { status: "PENDING" },
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