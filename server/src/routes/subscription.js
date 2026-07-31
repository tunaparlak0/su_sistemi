const subscriptionController = require('../controllers/subscription.controller');
const adminAuth = require('../middlewares/adminAuth');

async function subscriptionRoutes(fastify, options) {
  fastify.post('/', subscriptionController.applySubscription);
  fastify.get('/', { preHandler: [adminAuth(['SUPERADMIN', 'ADMIN', 'IT'])] }, subscriptionController.getAllSubscriptions);
  fastify.post('/approve/:id', { preHandler: [adminAuth(['SUPERADMIN', 'ADMIN', 'IT'])] }, subscriptionController.approveSubscription);
  fastify.post('/cancel', subscriptionController.cancelSubscription);
  fastify.post('/update-contact', subscriptionController.updateContactInfo);
  fastify.get('/logs', { preHandler: [adminAuth(['SUPERADMIN', 'IT'])] }, subscriptionController.getSubscriptionLogs);
  fastify.get('/logs/:id', { preHandler: [adminAuth(['SUPERADMIN', 'ADMIN', 'IT'])] }, subscriptionController.getLogsBySubscriptionId);
}

module.exports = subscriptionRoutes;