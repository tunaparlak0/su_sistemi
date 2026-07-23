const workerController = require('../controllers/worker.controller');

async function workerRoutes(fastify, options) {
  fastify.post('/', workerController.createWorker);
  fastify.get('/', workerController.getAllWorkers);
}

module.exports = workerRoutes;