const meterController = require('../controllers/meter.controller');

async function meterRoutes(fastify, options) {
  fastify.post('/', meterController.createMeter);
  fastify.get('/', meterController.getAllMeters);
}

module.exports = meterRoutes;