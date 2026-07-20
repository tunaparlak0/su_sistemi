const prisma = require('../config/prisma');
//const { generateInvoiceId } = require('../utils/idGenerator');

const create = async (data) => {
  const { subscriptionId, ...invoiceData } = data;
  
  // Sabit değerler
  const FIXED_UNIT_PRICE = 12.0;
  const FIXED_TAX_RATE = 14.0;

  const unitPrice = invoiceData.unitPrice || FIXED_UNIT_PRICE;
  const taxRate = invoiceData.taxRate || FIXED_TAX_RATE;
  
  // Toplam fiyatı hesapla: (Kullanılan su * Birim Fiyat) + Vergi
  // Not: Decimal ile işlem yaparken Number'a çevirmek gerekir
  const totalPrice = (invoiceData.usedWater * unitPrice) * (1 + (taxRate / 100));
  
  const date = invoiceData.invoiceDate || new Date();
  
  return await prisma.invoice.create({
    data: {
      usedWater: invoiceData.usedWater, // Gelen usedWater'ı kullan
      unitPrice: unitPrice,
      taxRate: taxRate,
      totalPrice: totalPrice, // Hesapladığımız değeri buraya koy
      id: generateInvoiceId(date),
      invoiceDate: date,
      subscription: { connect: { id: parseInt(subscriptionId) } }
    }
  });
};

const getBySubscription = async (subscriptionId) => {
  return await prisma.invoice.findMany({
    where: { subscriptionId: parseInt(subscriptionId) },
    orderBy: { invoiceDate: 'desc' } // En yeni fatura en üstte gelir
  });
};

module.exports = { create, getBySubscription };