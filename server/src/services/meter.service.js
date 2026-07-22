const prisma = require('../config/prisma');
const { formatMeterNo, generateSubscriptionId } = require('../utils/idGenerator');

const createMeter = async (data) => {
  const { address } = data;

  // 1. Sayaç numarasını güvenli şekilde hesapla
  const meterCount = await prisma.meter.count();
  const nextNumber = meterCount + 1;
  const newMeterNo = formatMeterNo(nextNumber); // Örn: "000001"

  // 2. Abonelik ID'sini güvenli şekilde hesapla
  const subCount = await prisma.subscription.count();
  const nextSubNumber = 1000001 + subCount;
  const newSubId = generateSubscriptionId(nextSubNumber); // Örn: "1000001"

  // 3. Önce Meter'ı oluştur (içinde subscriptions bloğu YOK)
  const newMeter = await prisma.meter.create({
    data: {
      meterNo: newMeterNo,
      address: address
    }
  });

  // 4. Ardından aboneliği bu sayaç numarasına bağlı olarak oluştur
  const newSubscription = await prisma.subscription.create({
    data: {
      id: newSubId,
      status: "FREE",
      meterId: newMeterNo
    }
  });

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