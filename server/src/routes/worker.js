const workerController = require('../controllers/worker.controller');

async function workerRoutes(fastify, options) {
  fastify.post('/', workerController.createWorker);
  fastify.get('/', workerController.getAllWorkers);
  fastify.put('/:id', workerController.updateWorker);
  fastify.delete('/:id', workerController.deleteWorker);
}

module.exports = workerRoutes;