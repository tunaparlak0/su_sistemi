const workerController = require('../controllers/worker.controller');
const adminAuth = require('../middlewares/adminAuth');

async function workerRoutes(fastify, options) {
  fastify.post('/', { preHandler: [adminAuth(['SUPERADMIN', 'IT', 'ADMIN'])] }, workerController.createWorker);
  fastify.get('/', { preHandler: [adminAuth(['SUPERADMIN', 'IT', 'ADMIN'])] }, workerController.getAllWorkers);
  fastify.put('/:id', { preHandler: [adminAuth(['SUPERADMIN', 'IT', 'ADMIN'])] }, workerController.updateWorker);
}

module.exports = workerRoutes;