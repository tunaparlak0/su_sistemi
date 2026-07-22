const prisma = require('../config/prisma');
const { generateInvoiceId } = require('../utils/idGenerator');

const create = async (data) => {
  const { subscriptionId, ...invoiceData } = data;
  const FIXED_UNIT_PRICE = 12.0;
  const FIXED_TAX_RATE = 14.0;
  const unitPrice = invoiceData.unitPrice || FIXED_UNIT_PRICE;
  const taxRate = invoiceData.taxRate || FIXED_TAX_RATE;
  const totalPrice = (Number(invoiceData.usedWater) * Number(unitPrice)) * (1 + (Number(taxRate) / 100));
  const invoiceDate = invoiceData.invoiceDate ? new Date(invoiceData.invoiceDate) : new Date();


  const dueDate = new Date(invoiceDate); 
  dueDate.setDate(dueDate.getDate() + 10); // Üzerine 10 gün ekle
  
  return await prisma.invoice.create({
    data: {
      usedWater: invoiceData.usedWater,
      unitPrice: unitPrice,
      taxRate: taxRate,
      totalPrice: totalPrice,
      invoiceDate: invoiceDate, 
      dueDate: dueDate,
      subscription: { connect: { id: subscriptionId } }
    }
  });
};

const getBySubscription = async (subscriptionId) => {
  return await prisma.invoice.findMany({
    where: { subscriptionId: subscriptionId },
    orderBy: { invoiceDate: 'desc' }
  });
};

module.exports = { create, getBySubscription };