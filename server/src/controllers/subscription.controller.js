const service = require('../services/subscription.service');

const index = async () => await service.getAll();
const store = async (req, reply) => {
  try {
    // userId'yi body'den bekliyoruz
    const result = await service.create(req.body);
    return reply.status(201).send({ message: "Abonelik başarıyla oluşturuldu", data: result });
  } catch (err) {
    return reply.status(500).send({ message: "Abonelik oluşturulamadı", error: err.message });
  }
};
const show = async (req) => await service.getById(req.params.id);

module.exports = { index, store, show };