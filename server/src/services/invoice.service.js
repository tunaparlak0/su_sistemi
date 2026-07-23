const prisma = require('../config/prisma');

const getInvoicesBySubscriptionId = async (subscriptionId) => {
  const invoices = await prisma.invoice.findMany({
    where: { subscriptionId: subscriptionId },
    orderBy: { invoiceDate: 'desc' }
  });

  return invoices;
};

module.exports = { getInvoicesBySubscriptionId };