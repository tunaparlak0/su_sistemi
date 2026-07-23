const prisma = require('../config/prisma');

const adminLogin = async (id, token) => {
  // Worker tablosunda id'ye göre arama yapıyoruz
  const worker = await prisma.worker.findUnique({ 
    where: { id: id },
    include: { user: true } // Kullanıcı bilgilerini de beraberinde alıyoruz
  });

  // Worker var mı, rolü ADMIN mi ve token eşleşiyor mu?
  if (!worker || worker.role !== 'ADMIN' || worker.token !== token) {
    throw new Error("Yetkisiz erişim!");
  }
  if (worker.status !== 'ACTIVE') {
    throw new Error("Admin hesabı aktif değil!");
  }
  return { 
    message: "Giriş başarılı", 
    user: { id: worker.id, role: worker.role, name: worker.user.name } 
  };
};

module.exports = { adminLogin };