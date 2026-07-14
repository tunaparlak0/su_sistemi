const prisma = require('../config/prisma');
const { generateSevenDigitId } = require('../utils/idGenerator');
const getAll = async () => await prisma.subscription.findMany({ include: { invoices: true } });

const create = async (data) => {
  const { userId, ...subData } = data;
  const newSubId = generateSevenDigitId();

  // İşlem: Hem abonelik oluştur hem de User'ı bu aboneliğe bağla
  return await prisma.$transaction([
    prisma.subscription.create({
      data: {
        id: newSubId,
        ...subData
      }
    }),
    prisma.user.update({
      where: { id: userId },
      data: { subscriptionId: newSubId }
    })
  ]);
};
const getById = async (id) => {
  return await prisma.subscription.findUnique({
    where: { id: parseInt(id) },
    include: {
      owner: { // owner ilişkisi üzerinden User tablosuna gidiyoruz
        select: { name: true, surname: true } // Sadece bunları alıyoruz
      }
    }
  });
};

module.exports = { getAll, create, getById };