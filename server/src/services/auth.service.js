const prisma = require('../config/prisma');

const adminLogin = async (id, token) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user || user.role !== 'ADMIN' || user.token !== token) {
    throw new Error("Yetkisiz erişim!");
  }
  
  return { message: "Giriş başarılı", user: { id: user.id, role: user.role } };
};

module.exports = { adminLogin };