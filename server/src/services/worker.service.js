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
  const { name, surname, mail, telephone, idNo, role = "WORKER" } = data;

  if (!name || !surname || !mail) {
    throw new Error("Ad, soyad ve e-posta alanları zorunludur.");
  }

  // TC Kimlik No Doğrulama (11 hane ve rakam olmalı)
  if (idNo) {
    const tcRegex = /^\d{11}$/;
    if (!tcRegex.test(idNo)) {
      throw new Error("TC Kimlik Numarası tam 11 haneli ve rakamlardan oluşmalıdır.");
    }
  }

  // Telefon Numarası Doğrulama (05 ile başlamalı ve 11 hane olmalı)
  if (telephone) {
    const phoneRegex = /^05\d{9}$/;
    if (!phoneRegex.test(telephone)) {
      throw new Error("Geçerli bir Türkiye telefon numarası giriniz (Örn: 05540232457).");
    }
  }
  
  const workerId = generateWorkerId(name, surname, role);
  const generatedPassword = generateRandomPassword();
  
  const newUser = await prisma.user.create({
    data: {
      name,
      surname,
      mail,
      telephone,
      idNo,
    }
  });

  const newWorker = await prisma.worker.create({
    data: {
      id: workerId,
      role: role, 
      status: "ACTIVE",
      password: generatedPassword,
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
      password: generatedPassword 
    },
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