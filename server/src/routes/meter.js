// routes/meter.js
const meterController = require('../controllers/meter.controller');

async function meterRoutes(fastify, options) {
  fastify.post('/', meterController.createMeter);
  fastify.get('/', meterController.getMeters);
}

module.exports = meterRoutes;