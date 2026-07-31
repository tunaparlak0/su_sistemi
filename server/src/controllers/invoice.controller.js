const invoiceService = require('../services/invoice.service');

const getInvoices = async (req, res) => {
  try {
    const { subscriptionId } = req.params;

    if (!subscriptionId) {
      return res.code(400).send({ error: "Abonelik numarası gereklidir." });
    }

    const invoices = await invoiceService.getInvoicesBySubscriptionId(subscriptionId);
    return res.code(200).send(invoices);
  } catch (error) {
    return res.code(500).send({ error: error.message });
  }
};

const payInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedInvoice = await invoiceService.payInvoice(id);
    return res.code(200).send({ message: "Fatura başarıyla ödendi.", data: updatedInvoice });
  } catch (error) {
    return res.code(400).send({ error: error.message });
  }
};

const createInvoice = async (req, res) => {
  try {
    const { subscriptionId, usedWater } = req.body; 
    
    //JWT token kullanıyoruz. req.user içeriği adminAuth middleware'inden geliyor!
    const workerId = req.user?.id;

    if (!workerId) {
      return res.code(401).send({ error: "Oturum bilgisi bulunamadı." });
    }

    const invoice = await invoiceService.createInvoice({ subscriptionId, usedWater }, workerId);

    return res.code(201).send({
      message: "Fatura başarıyla oluşturuldu.",
      data: invoice
    });
  } catch (error) {
    console.error("Fatura Oluşturma Hatası:", error.message);
    return res.code(400).send({ error: error.message });
  }
};

const getInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await invoiceService.getInvoiceById(id);
    return res.code(200).send(invoice);
  } catch (error) {
    return res.code(404).send({ error: error.message });
  }
};

module.exports = { getInvoices, createInvoice, payInvoice, getInvoiceById };