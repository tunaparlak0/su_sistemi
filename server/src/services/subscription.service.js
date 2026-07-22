const prisma = require('../config/prisma');

const applySubscription = async (data) => {
  const { name, surname, mail, telephone, idNo, subscriptionId } = data;

  // 1. Aboneliğin veritabanında var olup olmadığını kontrol et
  const existingSub = await prisma.subscription.findUnique({
    where: { id: subscriptionId }
  });

  if (!existingSub) {
    throw new Error("Girilen abonelik numarası bulunamadı.");
  }

  // 2. Kullanıcıyı oluştur ve ilgili aboneliğe bağla
  const newUser = await prisma.user.create({
    data: {
      name,
      surname,
      mail,
      telephone,
      idNo,
      subscriptionId: subscriptionId // Kullanıcıyı bu aboneliğe bağlıyoruz
    }
  });

  // 3. Aboneliğin durumunu başvuruldu (PENDING) olarak güncelle
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

module.exports = { applySubscription, getAllSubscriptions };