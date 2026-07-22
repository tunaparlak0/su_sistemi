const subscriptionService = require('../services/subscription.service');

const applySubscription = async (req, reply) => {
  try {
    const { name, surname, mail, telephone, idNo, subscriptionId } = req.body;

    if (!name || !surname || !subscriptionId) {
      return reply.code(400).send({ error: "Ad, soyad ve abonelik numarası zorunludur." });
    }

    const result = await subscriptionService.applySubscription({
      name,
      surname,
      mail,
      telephone,
      idNo,
      subscriptionId
    });

    return reply.code(201).send({
      message: "Abonelik başvurusu başarıyla alındı.",
      data: result
    });
  } catch (error) {
    return reply.code(400).send({ error: error.message });
  }
};

const getAllSubscriptions = async (req, reply) => {
  try {
    const subs = await subscriptionService.getAllSubscriptions();
    return reply.code(200).send(subs);
  } catch (error) {
    return reply.code(500).send({ error: error.message });
  }
};

module.exports = { applySubscription, getAllSubscriptions };