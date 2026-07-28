const prisma = require('../config/prisma');

const getAllUsersWithSubscriptions = async () => {
  return await prisma.user.findMany({
    where: {
      worker: { is: null } // Worker kaydı olanları listeden çıkarır
    },
    include: {
      subscription: {
        include: {
          meter: true
        }
      }
    },
    orderBy: { name: 'asc' }
  });
};

module.exports = { getAllUsersWithSubscriptions };