const prisma = require('../config/prisma');
const { generateWorkerId, generateRandomToken } = require('../utils/idGenerator');

// Admin yetki kontrolü
const verifyAdmin = async (userId, token) => {
  const workerRecord = await prisma.worker.findUnique({
    where: { userId: userId },
    include: { user: true }
  });

  if (!workerRecord || workerRecord.role !== 'ADMIN' || workerRecord.token !== token) {
    throw new Error("Admin yetkisi gerekiyor!");
  }
  return true;
};

// Yeni Worker (Personel/Admin) Oluşturma
const createWorker = async (adminId, adminToken, data) => {
  // 1. Admin yetkisini doğrula
  await verifyAdmin(adminId, adminToken);

  const { name, surname, mail, telephone, idNo, role = "WORKER" } = data;

  if (!name || !surname || !mail) {
    throw new Error("Ad, soyad ve e-posta alanları zorunludur.");
  }

  // 2. İstediğin kurala göre Worker ID üret (Örn: TP1429)
  const workerId = generateWorkerId(name, surname);

  // 3. 8 haneli rastgele harf/sayı karışımı şifre/token üret
  const generatedToken = generateRandomToken();

  // 4. Önce User tablosunda kullanıcı oluştur
  const newUser = await prisma.user.create({
    data: {
      name,
      surname,
      mail,
      telephone,
      idNo
    }
  });

  // 5. Ardından Worker tablosuna kaydet
  const newWorker = await prisma.worker.create({
    data: {
      id: workerId,
      role: role, // "WORKER" veya "ADMIN"
      status: "ACTIVE",
      token: generatedToken,
      userId: newUser.id
    },
    include: {
      user: true
    }
  });

  return {
    message: "Personel başarıyla oluşturuldu.",
    generatedCredentials: {
      workerId: workerId,
      token: generatedToken // Admin ekrana bunu basıp personelle paylaşabilir
    },
    worker: newWorker
  };
};

const getAllWorkers = async (adminId, adminToken) => {
  await verifyAdmin(adminId, adminToken);

  return await prisma.worker.findMany({
    include: {
      user: true
    }
  });
};

module.exports = { createWorker, getAllWorkers };