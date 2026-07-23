const authService = require('../services/auth.service');

async function authRoutes(fastify, options) {
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

// DİKKAT: Burada nesne veya başka bir şey değil, doğrudan fonksiyonu export etmelisin!
module.exports = authRoutes;