const prisma = require('../config/prisma');

const getAllUsersWithSubscriptions = async () => {
  return await prisma.user.findMany({
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