const controller = require('../controllers/user.controller');
const adminAuthMiddleware = require('../middlewares/adminAuth'); 

async function userRoutes(fastify, options) {
  fastify.get('/', controller.index);        
  fastify.post('/', controller.store);       
  fastify.post('/create-admin', { preHandler: adminAuthMiddleware }, controller.storeAdmin);
}

module.exports = userRoutes;