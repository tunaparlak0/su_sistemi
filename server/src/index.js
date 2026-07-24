const fastify = require('fastify')({ logger: true });
const prisma = require('./config/prisma');
require('dotenv').config();
// CORS ayarlarında PUT ve DELETE metodlarına izin veriyoruz
fastify.register(require('@fastify/jwt'), {
  secret: process.env.JWT_SECRET
});
fastify.decorate("authenticate", async function (request, reply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.code(401).send({ error: "Geçersiz veya eksik token!" });
  }
});
fastify.register(require('@fastify/cors'), {
  origin: true, 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'] // 📌 PATCH metodunu buraya ekledik!
});
fastify.register(require('./routes/subscription'), { prefix: '/subscriptions' });
fastify.register(require('./routes/invoice'), { prefix: '/invoices' });
//fastify.register(require('./routes/user'), { prefix: '/users' });
//fastify.register(require('./routes/subsLog'), { prefix: '/logs' });
fastify.register(require('./routes/auth'));
fastify.register(require('./routes/meter'),{prefix:'/meters'});
fastify.register(require('./routes/worker'),{prefix:'/workers'});

fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log('Sunucu 3000 portunda çalışıyor...');
});