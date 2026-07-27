const prisma = require('../config/prisma');

async function userRoutes(fastify, options) {
  // Tüm kullanıcıları ve aboneliklerini listeleme
  fastify.get('/', async (req, reply) => {
    try {
      const users = await prisma.user.findMany({
        include: {
          subscription: {
            include: { meter: true }
          }
        },
        orderBy: { name: 'asc' }
      });
      return reply.code(200).send(users);
    } catch (error) {
      return reply.code(500).send({ error: error.message });
    }
  });
}

module.exports = userRoutes;