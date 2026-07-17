// server/src/services/subscription.service.js
const prisma = require('../config/prisma');
const { generateUserId, generateSevenDigitId } = require('../utils/idGenerator');
const getAll = async () => await prisma.subscription.findMany();
const findPending = async () => await prisma.subscription.findMany({ 
    where: { status: "PENDING" } 
});

// Durumu güncelle
const updateStatus = async (id, status) => {
    return await prisma.subscription.update({
        where: { id: parseInt(id) },
        data: { status }
    });
};

const createSubscriptionRequest = async (data) => {
  const { name, surname, mail, telephone, address, idNo } = data;
  const userId = generateUserId(name, surname);
  const subId = generateSevenDigitId(); 

  return await prisma.user.create({
      data: {
        id: userId,
        name,
        surname,
        mail,
        telephone,
        subscription: {
          create: {
            id: subId,
            idNo,
            address,
            status: "PENDING"
          }
        }
      }
  });
};

const getById = async (id) => {
  return await prisma.subscription.findUnique({
    where: { id: parseInt(id) },
    include: { owners: { select: { name: true, surname: true } } }
  });
};

module.exports = { getAll, createSubscriptionRequest, getById, findPending, updateStatus };