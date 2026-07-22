// services/meter.service.js
const prisma = require('../config/prisma');
const { generateSubscriptionId, formatMeterNo } = require('../utils/idGenerator');

const createMeter = async (data) => {
  const { address } = data;

  // 1. Veritabanındaki en son sayacı bulup meterNo'yu (SK-00000X) otomatik artıralım
  const lastMeter = await prisma.meter.findFirst({
    orderBy: { meterNo: 'desc' }
  });

  let nextNumber = 1;
  if (lastMeter && lastMeter.meterNo) {
    const currentNum = parseInt(lastMeter.meterNo.split('-')[1]);
    nextNumber = currentNum + 1;
  }

  const newMeterNo = formatMeterNo(nextNumber); // Örn: SK-000001

  const lastMeterById = await prisma.meter.findFirst({
    orderBy: { id: 'desc' }
  });

  let nextIdNumber = 1000001; 
  if (lastMeterById && lastMeterById.id) {
   
    const currentIdNum = parseInt(lastMeterById.id.split('-')[1]);
    nextIdNumber = currentIdNum + 1;
  }
  const newId = generateSubscriptionId(nextIdNumber);
  // 3. Veritabanına kaydet
  return await prisma.meter.create({
    data: {
      id: newId,        
      meterNo: newMeterNo, 
      address: address     
    }
  });
};
const getAllMeters = async () => {
  return await prisma.meter.findMany({
    include: { subscriptions: true }
  });
};

module.exports = { createMeter, getAllMeters };