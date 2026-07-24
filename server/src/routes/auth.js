const authService = require('../services/auth.service');

async function authRoutes(fastify, options) {
  fastify.post('/admin-login-secret', async (req, reply) => {
    try {
      const { id, password } = req.body;
      
      // 📌 BURAYA DİKKAT: fastify nesnesini (veya req.server) servise gönderiyoruz!
      const result = await authService.adminLogin(id, password, fastify);
      
      return reply.send(result);
    } catch (err) {
      return reply.status(401).send({ message: err.message });
    }
  });
}

module.exports = authRoutes;