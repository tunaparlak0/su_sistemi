const userController = require('../controllers/user.controller');

async function userRoutes(fastify, options) {
  // Tüm kullanıcıları ve aboneliklerini listeleme (Controller üzerinden çalışır)
  fastify.get('/', userController.getUsers);
}

module.exports = userRoutes;