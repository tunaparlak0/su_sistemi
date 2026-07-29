const userController = require('../controllers/user.controller');
const adminAuth = require('../middlewares/adminAuth');

async function userRoutes(fastify, options) {
  fastify.get('/', { preHandler: [adminAuth(['SUPERADMIN', 'ADMIN', 'IT'])] }, userController.getUsers);
}

module.exports = userRoutes;