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

const payInvoice = async (req, reply) => {
  try {
    const { id } = req.params;
    const updatedInvoice = await invoiceService.payInvoice(id);
    return reply.code(200).send({ message: "Fatura başarıyla ödendi.", data: updatedInvoice });
  } catch (error) {
    return reply.code(400).send({ error: error.message });
  }
};

const createInvoice = async (req, reply) => {
  try {
    const { subscriptionId, usedWater } = req.body; 
    
    //JWT token kullanıyoruz. req.user içeriği adminAuth middleware'inden geliyor!
    const workerId = req.user?.id;

    if (!workerId) {
      return reply.code(401).send({ error: "Oturum bilgisi bulunamadı." });
    }

    const invoice = await invoiceService.createInvoice({ subscriptionId, usedWater }, workerId);

    return reply.code(201).send({
      message: "Fatura başarıyla oluşturuldu.",
      data: invoice
    });
  } catch (error) {
    console.error("Fatura Oluşturma Hatası:", error.message);
    return reply.code(400).send({ error: error.message });
  }
};

const getInvoiceById = async (req, reply) => {
  try {
    const { id } = req.params;
    const invoice = await invoiceService.getInvoiceById(id);
    return reply.code(200).send(invoice);
  } catch (error) {
    return reply.code(404).send({ error: error.message });
  }
};

module.exports = { getInvoices, createInvoice, payInvoice, getInvoiceById };