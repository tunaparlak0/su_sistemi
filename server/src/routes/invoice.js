const invoiceController = require('../controllers/invoice.controller');

async function invoiceRoutes(fastify, options) {
  fastify.get('/:subscriptionId', invoiceController.getInvoices);
}

module.exports = invoiceRoutes;