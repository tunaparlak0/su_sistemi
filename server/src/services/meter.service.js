const prisma = require('../config/prisma');
const { formatMeterNo, generateSubscriptionId } = require('../utils/idGenerator');

const createMeter = async (data, workerId) => {
  const { address } = data;

  const meterCount = await prisma.meter.count();
  const nextNumber = meterCount + 1;
  const newMeterNo = formatMeterNo(nextNumber); 
  const subCount = await prisma.subscription.count();
  const nextSubNumber = 1000001 + subCount;
  const newSubId = generateSubscriptionId(nextSubNumber); 

  const newMeter = await prisma.meter.create({
    data: {
      meterNo: newMeterNo,
      address: address
    }
  });

  const newSubscription = await prisma.subscription.create({
    data: {
      id: newSubId,
      status: "NULL",
      meterId: newMeterNo
    }
  });

  //WorkerLog: Yeni Sayaç ve Abonelik Oluşturma Logu
  if (workerId) {
    await prisma.workerLog.create({
      data: {
        action: "CREATE_METER",
        description: `${newMeterNo} numaralı yeni sayaç ve ${newSubId} ID'li boş abonelik oluşturuldu.`,
        workerId: workerId
      }
    });
  }

  return {
    ...newMeter,
    subscriptions: [newSubscription]
  };
};

const getAllMeters = async () => {
  return await prisma.meter.findMany({
    include: { subscriptions: true }
  });
};

module.exports = { createMeter, getAllMeters };