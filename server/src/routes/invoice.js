const controller = require('../controllers/invoice.controller');

async function invoiceRoutes(fastify, options) {
  fastify.post('/', controller.store);       // Fatura oluştur
  fastify.get('/:subscriptionId', controller.getBySub); // Aboneliğe ait faturaları getir
}

module.exports = invoiceRoutes;