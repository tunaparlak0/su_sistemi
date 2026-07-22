// controllers/meter.controller.js
const meterService = require('../services/meter.service');

const createMeter = async (req, reply) => {
  try {
    // DİKKAT: req.body parametresini buraya ekliyoruz ki servise gitsin
    const meter = await meterService.createMeter(req.body);
    
    return reply.code(201).send({
      message: "Sayaç başarıyla oluşturuldu.",
      data: meter
    });
  } catch (error) {
    return reply.code(500).send({ error: error.message });
  }
};

const getMeters = async (req, reply) => {
  try {
    const meters = await meterService.getAllMeters();
    return reply.code(200).send(meters);
  } catch (error) {
    return reply.code(500).send({ error: error.message });
  }
};

module.exports = { createMeter, getMeters };