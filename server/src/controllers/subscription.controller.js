const subscriptionService = require('../services/subscription.service');

const applySubscription = async (req,res) => {
  try {
    // taxNo ve meterType alanları da destructuring ile eklendi
    const { name, surname, mail, telephone, idNo, taxNo, subscriptionId, meterType } = req.body;

    if (!name || !surname || !subscriptionId) {
      return res.code(400).send({ message: "Ad, soyad ve abonelik numarası zorunludur.",
        status:false,data:[], });
    }

    const result = await subscriptionService.applySubscription({
      name,
      surname,
      mail,
      telephone,
      idNo,
      taxNo,
      subscriptionId,
      meterType
    });

    return res.code(201).send({
      message: "Abonelik başvurusu başarıyla alındı.",
      data: result
    });
  } catch (error) {
    return res.code(400).send({ error: error.message });
  }
};

const getAllSubscriptions = async (req, res) => {
  try {
    const subs = await subscriptionService.getAllSubscriptions();
    return res.code(200).send(subs);
  } catch (error) {
    return res.code(500).send({ error: error.message });
  }
};

const approveSubscription = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.code(400).send({ error: "Abonelik ID parametresi eksik." });
    }

    const result = await subscriptionService.approveSubscription(id);

    return res.code(200).send({
      message: "Abonelik başarıyla onaylandı.",
      data: result
    });
  } catch (error) {
    return res.code(400).send({ error: error.message });
  }
};
const cancelSubscription = async (req, res) => {
  try {
    const { subscriptionId, idNo } = req.body;
    const result = await subscriptionService.cancelSubscription(subscriptionId, idNo);
    return res.code(200).send({ message: "Abonelik başarıyla iptal edildi.", data: result });
  } catch (error) {
    return res.code(400).send({ error: error.message });
  }
};

const updateContactInfo = async (req, res) => {
  try {
    const { subscriptionId, idNo, mail, telephone } = req.body;
    const result = await subscriptionService.updateContactInfo(subscriptionId, idNo, mail, telephone);
    return res.code(200).send({ message: "Bilgileriniz başarıyla güncellendi.", data: result });
  } catch (error) {
    return res.code(400).send({ error: error.message });
  }
};
const getSubscriptionLogs = async (req, res) => {
  try {
    const logs = await subscriptionService.getSubscriptionLogs();
    return res.code(200).send(logs);
  } catch (error) {
    return res.code(500).send({ error: error.message });
  }
};
const getLogsBySubscriptionId = async (req, res) => {
  try {
    const { id } = req.params;
    const logs = await subscriptionService.getLogsBySubscriptionId(id);
    return res.code(200).send(logs);
  } catch (error) {
    return res.code(500).send({ error: error.message });
  }
};
module.exports = { applySubscription, getAllSubscriptions, approveSubscription, cancelSubscription, updateContactInfo, getSubscriptionLogs, getLogsBySubscriptionId };