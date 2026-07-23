const invoiceService = require('../services/invoice.service');

const getInvoices = async (req, reply) => {
  try {
    const { subscriptionId } = req.params;

    if (!subscriptionId) {
      return reply.code(400).send({ error: "Abonelik numarası gereklidir." });
    }

    const invoices = await invoiceService.getInvoicesBySubscriptionId(subscriptionId);

    return reply.code(200).send(invoices);
  } catch (error) {
    return reply.code(500).send({ error: error.message });
  }
};

module.exports = { getInvoices };