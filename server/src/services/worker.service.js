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
      idNo
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

const updateWorker = async (adminId, adminToken, targetWorkerId, data) => {
  await verifyAdmin(adminId, adminToken);
  const { role, status, telephone, mail } = data;

  const workerRecord = await prisma.worker.findUnique({
    where: { id: targetWorkerId },
    include: { user: true }
  });

  if (!workerRecord) {
    throw new Error("Personel bulunamadı.");
  }

  if (mail || telephone) {
    await prisma.user.update({
      where: { id: workerRecord.userId },
      data: {
        ...(mail && { mail }),
        ...(telephone && { telephone })
      }
    });
  }

  const updatedWorker = await prisma.worker.update({
    where: { id: targetWorkerId },
    data: {
      ...(role && { role }),
      ...(status && { status })
    },
    include: { user: true }
  });

  return {
    message: "Personel başarıyla güncellendi.",
    worker: updatedWorker
  };
};

const deleteWorker = async (adminId, adminToken, targetWorkerId) => {
  await verifyAdmin(adminId, adminToken);

  const workerRecord = await prisma.worker.findUnique({
    where: { id: targetWorkerId }
  });

  if (!workerRecord) {
    throw new Error("Personel bulunamadı.");
  }

  await prisma.worker.delete({
    where: { id: targetWorkerId }
  });

  return {
    message: "Personel başarıyla silindi."
  };
};

module.exports = { createWorker, getAllWorkers, updateWorker, deleteWorker };