const fastify = require('fastify')({ logger: true });
const prisma = require('./config/prisma');
require('dotenv').config();

// 1. JWT Eklentisini buraya ekliyoruz
fastify.register(require('@fastify/jwt'), {
  secret: process.env.JWT_SECRET
});

fastify.register(require('@fastify/cors'), {
  origin: true, 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
});

// Route kayıtları...
fastify.register(require('./routes/subscription'), { prefix: '/subscriptions' });
fastify.register(require('./routes/invoice'), { prefix: '/invoices' });
fastify.register(require('./routes/user'), { prefix: '/users' });
fastify.register(require('./routes/auth'));
fastify.register(require('./routes/meter'), { prefix: '/meters' });
fastify.register(require('./routes/worker'), { prefix: '/workers' });

fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log('Sunucu 3000 portunda çalışıyor...');
});