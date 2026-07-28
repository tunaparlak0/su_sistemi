const prisma = require('../config/prisma');
const { generateWorkerId, generateRandomPassword } = require('../utils/idGenerator');

// Admin yetki kontrolü
const verifyAdmin = async (adminId, adminPassword) => {
  const workerRecord = await prisma.worker.findUnique({
    where: { id: adminId }, 
    include: { user: true }
  });

  if (!workerRecord || workerRecord.role !== 'ADMIN' || workerRecord.password !== adminPassword) {
    throw new Error("Admin yetkisi gerekiyor!");
  }
  return true;
};

const createWorker = async (adminId, adminPassword, data) => {
  await verifyAdmin(adminId, adminPassword);
  const { name, surname, mail, telephone, idNo } = data;

  if (!name || !surname || !mail) {
    throw new Error("Ad, soyad ve e-posta alanları zorunludur.");
  }

  // TC ve Telefon doğrulama kodları aynı...

  const workerId = generateWorkerId(name, surname);
  const generatedPassword = generateRandomPassword();
  
  const newUser = await prisma.user.create({
    data: { name, surname, mail, telephone, idNo }
  });

  const newWorker = await prisma.worker.create({
    data: {
      id: workerId,
      role: "NULL", // 📌 Kullanıcı eklenirken rolü direkt NULL olarak atanır
      status: "ACTIVE",
      password: generatedPassword,
      userId: newUser.id
    },
    include: { user: true }
  });

  return {
    message: "Personel başarıyla oluşturuldu.",
    generatedCredentials: { workerId: workerId, password: generatedPassword },
    worker: newWorker
  };
};

const getAllWorkers = async (adminId, adminPassword) => {
  await verifyAdmin(adminId, adminPassword);

  return await prisma.worker.findMany({
    include: {
      user: true
    }
  });
};

const updateWorker = async (adminId, adminPassword, targetWorkerId, data) => {
  await verifyAdmin(adminId, adminPassword);
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


module.exports = { createWorker, getAllWorkers, updateWorker };