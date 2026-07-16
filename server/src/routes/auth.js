// server/src/routes/auth.js
const authService = require('../services/auth.service');

async function authRoutes(fastify) {
  fastify.post('/admin-login-secret', async (req, reply) => {
    try {
      const { id, token } = req.body;
      const result = await authService.adminLogin(id, token);
      return result;
    } catch (err) {
      return reply.status(401).send({ message: err.message });
    }
  });
}