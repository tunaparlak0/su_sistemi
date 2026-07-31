const prisma = require('../config/prisma');
const { generateWorkerId, generateRandomPassword } = require('../utils/idGenerator');

const createWorker = async (data, performedByWorkerId) => {
  const { name, surname, mail, telephone, idNo, role } = data;

  if (!name || !surname || !mail) {
    throw new Error("Ad, soyad ve e-posta alanları zorunludur.");
  }

  const workerId = generateWorkerId(name, surname);
  const generatedPassword = generateRandomPassword();
  
  const newUser = await prisma.user.create({
    data: { name, surname, mail, telephone, idNo }
  });

  const newWorker = await prisma.worker.create({
    data: {
      id: workerId,
      role: role || "WORKER", 
      status: "ACTIVE",
      password: generatedPassword,
      userId: newUser.id
    },
    include: { user: true }
  });

  // WorkerLog Kaydı At
  await prisma.workerLog.create({
    data: {
      action: "CREATE_WORKER",
      description: `${workerId} ID'li yeni personel (${name} ${surname}) oluşturuldu.`,
      workerId: performedByWorkerId // İşlemi yapan admin
    }
  });

  return {
    message: "Personel başarıyla oluşturuldu.",
    generatedCredentials: { workerId: workerId, password: generatedPassword },
    worker: newWorker
  };
};

const getAllWorkers = async () => {
  return await prisma.worker.findMany({
    include: {
      user: true
    }
  });
};

const updateWorker = async (targetWorkerId, data, performedByWorkerId) => {
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

  // WorkerLog Kaydı At
  await prisma.workerLog.create({
    data: {
      action: "UPDATE_WORKER",
      description: `${targetWorkerId} ID'li personel bilgileri güncellendi.`,
      workerId: performedByWorkerId
    }
  });

  return {
    message: "Personel başarıyla güncellendi.",
    worker: updatedWorker
  };
};
const getWorkerLogs = async () => {
  return await prisma.workerLog.findMany({
    include: {
      worker: {
        include: {
          user: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
};
module.exports = { createWorker, getAllWorkers, updateWorker, getWorkerLogs };