const prisma = require('../config/prisma');

module.exports = async (request, reply) => {
  const token = request.headers['x-admin-token']; // Token'ı header'dan alacağız
  const userId = request.headers['x-admin-id'];

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user || user.role !== 'ADMIN' || user.token !== token) {
    return reply.status(403).send({ message: "Admin yetkisi gerekiyor!" });
  }
};