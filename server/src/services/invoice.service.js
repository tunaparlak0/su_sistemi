const prisma = require('../config/prisma');

const getInvoicesBySubscriptionId = async (subscriptionId) => {
  // Verilen subscriptionId'ye ait faturaları tarihe göre azalan şekilde getir
  const invoices = await prisma.invoice.findMany({
    where: { subscriptionId: subscriptionId },
    orderBy: { invoiceDate: 'desc' }
  });

  return invoices;
};

module.exports = { getInvoicesBySubscriptionId };