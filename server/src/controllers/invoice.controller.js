const service = require('../services/invoice.service');

const store = async (req, reply) => {
  try {
    const invoice = await service.create(req.body);
    return reply.status(201).send(invoice);
  } catch (err) {
    return reply.status(500).send({ message: "Fatura oluşturulamadı", error: err.message });
  }
};

const getBySub = async (req, reply) => {
  const { subscriptionId } = req.params;
  
  // Eğer id null veya "null" ise boş dizi dön
  if (!subscriptionId || subscriptionId === 'null') {
    return [];
  }
  
  return await service.getBySubscription(subscriptionId);
};

module.exports = { store, getBySub };