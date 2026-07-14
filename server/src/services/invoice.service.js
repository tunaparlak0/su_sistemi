const prisma = require('../config/prisma');
const { generateInvoiceId } = require('../utils/idGenerator');

const create = async (data) => {
  // Tarih gelmediyse şu anı al
  const date = data.invoiceDate || new Date();
  
  return await prisma.invoice.create({
    data: {
      ...data,
      id: generateInvoiceId(date),
      invoiceDate: date
    }
  });
};

const getBySubscription = async (subscriptionId) => {
  return await prisma.invoice.findMany({ 
    where: { subscriptionId: parseInt(subscriptionId) } 
  });
};

module.exports = { create, getBySubscription };