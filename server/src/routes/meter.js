const meterController = require('../controllers/meter.controller');
const adminAuth = require('../middlewares/adminAuth');

async function meterRoutes(fastify, options) {
  fastify.post('/', { preHandler: [adminAuth(['SUPERADMIN', 'ADMIN', 'WORKER'])] }, meterController.createMeter);
  fastify.get('/', { preHandler: [adminAuth(['SUPERADMIN', 'ADMIN', 'WORKER'])] }, meterController.getAllMeters);
}

module.exports = meterRoutes;