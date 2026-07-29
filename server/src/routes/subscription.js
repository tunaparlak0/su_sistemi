const subscriptionController = require('../controllers/subscription.controller');
const adminAuth = require('../middlewares/adminAuth');

async function subscriptionRoutes(fastify, options) {
  fastify.post('/', subscriptionController.applySubscription); // Vatandaş başvurusu (Açık)
  fastify.get('/', { preHandler: [adminAuth(['SUPERADMIN', 'ADMIN', 'IT'])] }, subscriptionController.getAllSubscriptions);
  fastify.post('/approve/:id', { preHandler: [adminAuth(['SUPERADMIN', 'ADMIN', 'IT'])] }, subscriptionController.approveSubscription);
}

module.exports = subscriptionRoutes;