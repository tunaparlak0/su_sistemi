const controller = require('../controllers/invoice.controller');

async function invoiceRoutes(fastify, options) {
  // Fatura oluşturma: Sadece Admin
  fastify.post('/', { preHandler: require('../middlewares/adminAuth') }, controller.store);
  
  // Kullanıcının kendi faturaları
  fastify.get('/:subscriptionId', controller.getBySub);
} 

module.exports = invoiceRoutes;