const meterService = require('../services/meter.service');

const createMeter = async (req, reply) => {
  try {
    const { address } = req.body;
    if (!address) {
      return reply.code(400).send({ error: "Adres alanı zorunludur." });
    }

    const newMeter = await meterService.createMeter({ address });
    return reply.code(201).send({
      message: "Sayaç ve bağlı abonelik başarıyla oluşturuldu.",
      data: newMeter
    });
  } catch (error) {
    return reply.code(500).send({ error: error.message });
  }
};

const getAllMeters = async (req, reply) => {
  try {
    const meters = await meterService.getAllMeters();
    return reply.code(200).send(meters);
  } catch (error) {
    return reply.code(500).send({ error: error.message });
  }
};

module.exports = { createMeter, getAllMeters };