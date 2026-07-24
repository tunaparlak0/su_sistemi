const invoiceController = require('../controllers/invoice.controller');

async function invoiceRoutes(fastify, options) {
  // Sayaç okuyucunun fatura kesmesi için (JWT şart)
  fastify.post('/', { preValidation: [fastify.authenticate] }, invoiceController.createInvoice);
  fastify.patch('/:id/pay', invoiceController.payInvoice);
  // Aboneliğe ait faturaları listeleme
  fastify.get('/:subscriptionId', invoiceController.getInvoices);
}

module.exports = invoiceRoutes;