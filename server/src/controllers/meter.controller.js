const meterService = require('../services/meter.service');

const createMeter = async (req, res) => {
  try {
    const { address } = req.body;
    if (!address) {
      return res.code(400).send({ error: "Adres alanı zorunludur." });
    }

    const newMeter = await meterService.createMeter({ address });
    return res.code(201).send({
      message: "Sayaç ve bağlı abonelik başarıyla oluşturuldu.",
      data: newMeter
    });
  } catch (error) {
    return res.code(500).send({ error: error.message });
  }
};

const getAllMeters = async (req, res) => {
  try {
    const meters = await meterService.getAllMeters();
    return res.code(200).send(meters);
  } catch (error) {
    return res.code(500).send({ error: error.message });
  }
};

module.exports = { createMeter, getAllMeters };