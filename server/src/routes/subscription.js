const subscriptionController = require('../controllers/subscription.controller');

async function subscriptionRoutes(fastify, options) {
  fastify.post('/', subscriptionController.applySubscription);
  fastify.get('/', subscriptionController.getAllSubscriptions);
  fastify.post('/approve/:id', subscriptionController.approveSubscription);
}

module.exports = subscriptionRoutes;