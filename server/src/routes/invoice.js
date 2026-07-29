const invoiceController = require('../controllers/invoice.controller');
const adminAuth = require('../middlewares/adminAuth');

async function invoiceRoutes(fastify, options) {
  fastify.post('/', { preHandler: [adminAuth(['SUPERADMIN', 'ADMIN', 'WORKER'])] }, invoiceController.createInvoice);
  fastify.get('/detail/:id', { preHandler: [adminAuth(['SUPERADMIN', 'ADMIN', 'WORKER', 'IT'])] }, invoiceController.getInvoiceById); 
  fastify.patch('/:id/pay', invoiceController.payInvoice);
  fastify.get('/:subscriptionId', { preHandler: [adminAuth(['SUPERADMIN', 'ADMIN', 'WORKER', 'IT'])] }, invoiceController.getInvoices);
}

module.exports = invoiceRoutes;