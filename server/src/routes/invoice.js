const invoiceController = require('../controllers/invoice.controller');

async function invoiceRoutes(fastify, options) {
  fastify.post('/', { preValidation: [fastify.authenticate] }, invoiceController.createInvoice);
  fastify.get('/detail/:id', invoiceController.getInvoiceById); // 📌 Fatura ID'sine göre detay
  fastify.patch('/:id/pay', invoiceController.payInvoice);
  fastify.get('/:subscriptionId', invoiceController.getInvoices);
}

module.exports = invoiceRoutes;