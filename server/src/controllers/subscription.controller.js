const service = require('../services/subscription.service');

const index = async () => await service.getAll();
const store = async (req, reply) => {
  try {
    const result = await service.createSubscriptionRequest(req.body);
    return reply.status(201).send({ message: "Başvurunuz alındı", data: result });
  } catch (err) {
    return reply.status(500).send({ message: "Başvuru oluşturulamadı", error: err.message });
  }
};
const show = async (req) => await service.getById(req.params.id);

module.exports = { index, store, show };