const prisma = require('../config/prisma');

const getInvoicesBySubscriptionId = async (subscriptionId) => {
  const invoices = await prisma.invoice.findMany({
    where: { subscriptionId: subscriptionId },
    include: {
      subscription: {
        include: {
          meter: true,   // Adres bilgisi için Meter'ı alıyoruz
          owners: true   // İsim, soyisim için User'ları alıyoruz
        }
      }
    },
    orderBy: { invoiceDate: 'desc' }
  });

  return invoices;
};

const createInvoice = async (data, workerId) => {
  const { meterNo, usedWater } = data;

  // 1. Sayaç ve aktif aboneliği bul
  const meter = await prisma.meter.findUnique({
    where: { meterNo },
    include: { 
      subscriptions: {
        where: { status: "ACTIVE" },
        take: 1
      }
    }
  });

  if (!meter) {
    throw new Error("Belirtilen numaraya ait sayaç bulunamadı.");
  }

  if (!meter.subscriptions || meter.subscriptions.length === 0) {
    throw new Error("Bu sayaca ait aktif bir abonelik bulunmuyor.");
  }

  const subscriptionId = meter.subscriptions[0].id;

  // 2. Tarife tipine göre birim fiyat ve vergi belirle (EV, KOY, KURUMSAL)
  let unitPrice = 10; 
  let taxRate = 0.10; 

  if (meter.type === "KOY") {
    unitPrice = 5;    
    taxRate = 0.05;
  } else if (meter.type === "KURUMSAL") {
    unitPrice = 20;   
    taxRate = 0.18;
  }

  // 3. Fiyat Hesaplama
  const waterAmount = parseFloat(usedWater);
  const subTotal = waterAmount * unitPrice;
  const taxAmount = subTotal * taxRate;
  const totalPrice = subTotal + taxAmount;

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 15);

  // 4. Faturayı Kaydet
  const newInvoice = await prisma.invoice.create({
    data: {
      usedWater: waterAmount,
      unitPrice: unitPrice,
      taxRate: taxRate,
      totalPrice: totalPrice,
      dueDate: dueDate,
      subscriptionId: subscriptionId
    }
  });

  // 5. WorkerLog Kaydı At
  await prisma.workerLog.create({
    data: {
      action: "CREATE_INVOICE",
      description: `${meterNo} numaralı sayaç için ${waterAmount} m3 tüketimli fatura kesildi.`,
      workerId: workerId
    }
  });

  return newInvoice;
};
const payInvoice = async (invoiceId) => {
  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId }
  });

  if (!invoice) {
    throw new Error("Fatura bulunamadı.");
  }

  return await prisma.invoice.update({
    where: { id: invoiceId },
    data: { isPaid: true }
  });
};
module.exports = { getInvoicesBySubscriptionId, createInvoice, payInvoice };