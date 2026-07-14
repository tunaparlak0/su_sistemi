const controller = require('../controllers/user.controller');

async function userRoutes(fastify, options) {
  fastify.get('/', controller.index);        // Tüm kullanıcıları listele
  fastify.post('/', controller.store);       // Yeni kullanıcı ekle
}

module.exports = userRoutes;