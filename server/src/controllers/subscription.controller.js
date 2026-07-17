// server/src/controllers/subscription.controller.js
const service = require('../services/subscription.service');

const index = async () => await service.getAll();

const getPending = async () => await service.findPending();

const approve = async (req, reply) => {
    const { id } = req.params;
    return await service.updateStatus(id, 'APPROVED');
};

const store = async (req, reply) => {
  try {
    const result = await service.createSubscriptionRequest(req.body); 
    return reply.status(201).send(result);
  } catch (error) {
    if (error.code === 'P2002') {
      return reply.status(400).send({ error: "Bu bilgilerle zaten kayıtlı bir abonelik var." });
    }
    return reply.status(500).send({ error: "Sunucu hatası." });
  }
};

const show = async (req) => await service.getById(req.params.id);

module.exports = { index, store, show, getPending, approve };