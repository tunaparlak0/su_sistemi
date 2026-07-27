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
const getInvoiceById = async (invoiceId) => {
  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId },
    include: {
      subscription: {
        include: {
          meter: true,
          owners: true
        }
      }
    }
  });

  if (!invoice) {
    throw new Error("Fatura bulunamadı.");
  }

  return invoice;
};
const createInvoice = async (data, workerId) => {
  const { subscriptionId, usedWater } = data;

  // 1. Aboneliği ve bağlı olduğu sayaç ile tarife bilgisini bul
  const subscription = await prisma.subscription.findUnique({
    where: { id: subscriptionId },
    include: { meter: true }
  });

  if (!subscription) {
    throw new Error("Belirtilen numaraya ait abonelik bulunamadı.");
  }

  if (subscription.status !== "ACTIVE") {
    throw new Error("Bu abonelik aktif durumda değil.");
  }

  const meter = subscription.meter;

  // 2. Tarife tipine göre birim fiyat ve vergi belirle (EV, KOY, KURUMSAL)
  let unitPrice = 10; 
  let taxRate = 0.10; 

  if (meter && meter.type === "KOY") {
    unitPrice = 5;    
    taxRate = 0.05;
  } else if (meter && meter.type === "KURUMSAL") {
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
      description: `${subscriptionId} numaralı abonelik için ${waterAmount} m3 tüketimli fatura kesildi.`,
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

  // Eğer fatura zaten ödenmişse tekrar ödemeye çalışmasın
  if (invoice.isPaid) {
    throw new Error("Bu fatura zaten daha önce ödenmiştir.");
  }

  return await prisma.invoice.update({
    where: { id: invoiceId },
    data: { isPaid: true }
  });
};

module.exports = { getInvoicesBySubscriptionId, createInvoice, payInvoice, getInvoiceById };