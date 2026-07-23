const prisma = require('../config/prisma');
const { generateWorkerId, generateRandomToken } = require('../utils/idGenerator');

// Admin yetki kontrolü
const verifyAdmin = async (adminId, token) => {
  const workerRecord = await prisma.worker.findUnique({
    where: { id: adminId }, 
    include: { user: true }
  });

  if (!workerRecord || workerRecord.role !== 'ADMIN' || workerRecord.token !== token) {
    throw new Error("Admin yetkisi gerekiyor!");
  }
  return true;
};

const createWorker = async (adminId, adminToken, data) => {
  await verifyAdmin(adminId, adminToken);
  const { name, surname, mail, telephone, idNo, role = "WORKER" } = data;

  if (!name || !surname || !mail) {
    throw new Error("Ad, soyad ve e-posta alanları zorunludur.");
  }
  
  const workerId = generateWorkerId(name, surname);
  const generatedToken = generateRandomToken();
  
  const newUser = await prisma.user.create({
    data: {
      name,
      surname,
      mail,
      telephone,
      idNo // TC Kimlik Numarası veritabanına kaydediliyor
    }
  });

  const newWorker = await prisma.worker.create({
    data: {
      id: workerId,
      role: role, 
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
      token: generatedToken 
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