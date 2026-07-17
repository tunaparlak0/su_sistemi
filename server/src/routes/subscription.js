const controller = require('../controllers/subscription.controller');

async function subscriptionRoutes(fastify, options) {
  fastify.get('/', controller.index);        // Tüm abonelikleri listele
  fastify.post('/', controller.store);       // Yeni abonelik oluştur
  fastify.get('/pending', controller.getPending); 
  fastify.post('/approve/:id', controller.approve); 
  fastify.get('/:id', controller.show);      // Tek bir abonelik getir
}

module.exports = subscriptionRoutes;