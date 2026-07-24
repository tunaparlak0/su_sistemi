const prisma = require('../config/prisma');

const adminLogin = async (id, password, fastify) => {
  const worker = await prisma.worker.findUnique({ 
    where: { id: id },
    include: { user: true }
  });

  if (!worker || worker.password !== password) {
    throw new Error("Yetkisiz erişim veya hatalı bilgi!");
  }
  if (worker.status !== 'ACTIVE') {
    throw new Error("Hesap aktif değil!");
  }

  // 📌 Artık fastify nesnesi buraya güvenle geliyor ve JWT üretebiliyor
  const jwtToken = fastify.jwt.sign({ 
    id: worker.id, 
    role: worker.role 
  }, { expiresIn: '8h' });

  return { 
    message: "Giriş başarılı", 
    token: jwtToken, 
    user: { id: worker.id, role: worker.role, name: worker.user.name } 
  };
};

module.exports = { adminLogin };