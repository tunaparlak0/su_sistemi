const prisma = require('../config/prisma');

const applySubscription = async (data) => {
  const { name, surname, mail, telephone, idNo, subscriptionId } = data;

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