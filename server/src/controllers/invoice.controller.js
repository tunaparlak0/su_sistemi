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
    console.log("Gelen User:", req.user); // Token'dan user geliyor mu kontrol et
    console.log("Gelen Body:", req.body); // Formdan veriler geliyor mu kontrol et

    const { meterNo, usedWater } = req.body;
    const workerId = req.user.id; 

    const invoice = await invoiceService.createInvoice({ meterNo, usedWater }, workerId);

    return reply.code(201).send({
      message: "Fatura başarıyla oluşturuldu.",
      data: invoice
    });
  } catch (error) {
    console.error("Fatura Oluşturma Hatası:", error.message); // 📌 Hatayı konsola yazdır
    return reply.code(400).send({ error: error.message });
  }
};
module.exports = { getInvoices, createInvoice, payInvoice };