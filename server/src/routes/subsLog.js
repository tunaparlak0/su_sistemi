// server/src/routes/subsLog.js
const controller = require('../controllers/subsLog.controller');

async function subsLogRoutes(fastify, options) {
    
    fastify.get('/', controller.index);
    
    // Belirli bir aboneliğe ait logları getir (Örn: /logs/subscription/123)
    fastify.get('/subscription/:subscriptionId', controller.getBySubscription);
    fastify.post('/', controller.store);
}

module.exports = subsLogRoutes;