const fastify = require('fastify')({ logger: true });
const prisma = require('./config/prisma');

// Plugin'leri kaydet
fastify.register(require('@fastify/cors'));


fastify.register(require('./routes/subscription'), { prefix: '/subscriptions' });
fastify.register(require('./routes/invoice'), { prefix: '/invoices' });
fastify.register(require('./routes/user'), { prefix: '/users' });
fastify.register(require('./routes/subsLog'), { prefix: '/logs' });
fastify.register(require('./routes/meter'),{prefix:'/meters'});
fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log('Sunucu 3000 portunda çalışıyor...');
});