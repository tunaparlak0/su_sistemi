const prisma = require('../config/prisma');
const { generateUserId, generateSevenDigitId } = require('../utils/idGenerator');

const getAll = async () => await prisma.subscription.findMany({ include: { invoices: true } });

const createSubscriptionRequest = async (data) => {
  const { name, surname, mail, telephone, address, idNo } = data;
  
  // 1. ID'leri üret
  const userId = generateUserId(name, surname);
  const subId = generateSevenDigitId(); // BURASI DÜZELTİLDİ

  // 2. İşlem
  return await prisma.$transaction([
    prisma.user.create({
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
    })
  ]);
};

const getById = async (id) => {
  return await prisma.subscription.findUnique({
    where: { id: parseInt(id) },
    include: {
      owners: { 
        select: { name: true, surname: true }
      }
    }
  });
};

module.exports = { getAll, createSubscriptionRequest, getById };