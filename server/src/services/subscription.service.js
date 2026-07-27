const prisma = require('../config/prisma');

const applySubscription = async (data) => {
  const { name, surname, mail, telephone, idNo, taxNo, subscriptionId } = data;

  // 1. Zorunlu alanların kontrolü
  if (!name || !surname || !mail || !telephone || !subscriptionId) {
    throw new Error("Ad, soyad, e-posta, telefon ve abonelik numarası zorunludur.");
  }

  // 2. TC veya Vergi No Zorunluluğu (En biri zorunlu)
  if (!idNo && !taxNo) {
    throw new Error("Lütfen TC Kimlik Numarası veya Vergi Numarasından en az birini giriniz.");
  }

  // 3. TC Kimlik No Doğrulama (11 hane ve rakam olmalı)
  if (idNo) {
    const tcRegex = /^\d{11}$/;
    if (!tcRegex.test(idNo)) {
      throw new Error("TC Kimlik Numarası tam 11 haneli ve rakamlardan oluşmalıdır.");
    }
  }

  // 4. Vergi No Doğrulama (12 hane ve rakam olmalı)
  if (taxNo) {
    const taxRegex = /^\d{12}$/;
    if (!taxRegex.test(taxNo)) {
      throw new Error("Vergi Numarası tam 12 haneli ve rakamlardan oluşmalıdır.");
    }
  }

  // 5. Telefon Numarası Doğrulama (Türkiye formatı: 05 ile başlamalı ve 11 hane olmalı)
  const phoneRegex = /^05\d{9}$/;
  if (!phoneRegex.test(telephone)) {
    throw new Error("Geçerli bir Türkiye telefon numarası giriniz (Örn: 05540232457).");
  }

  // 6. E-posta Formatı Doğrulama
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(mail)) {
    throw new Error("Lütfen geçerli bir e-posta adresi giriniz.");
  }

  // Abonelik var mı kontrolü
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
      idNo,
      taxNo, // Vergi no alanını da veritabanına kaydediyoruz
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