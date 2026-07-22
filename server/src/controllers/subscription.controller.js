// server/src/controllers/subscription.controller.js
const service = require('../services/subscription.service');

const index = async (req, reply) => await service.getAll();

const getPending = async (req, reply) => await service.findPending();

const approve = async (req, reply) => {
    const { id } = req.params;
    return await service.updateStatus(id, 'APPROVED');
};

const store = async (req, reply) => {
  try {
    const result = await service.createSubscriptionRequest(req.body); 
    return reply.status(201).send(result);
  } catch (error) {
    // 1. Terminale hatayı yazdır (Sorunu anlamak için en önemli kısım)
    console.error("DEBUG - Subscription Controller Hatası:", error);

    // 2. Eğer servis katmanından özel bir hata mesajı gelirse (örneğin "Sayaç numarası zorunludur")
    if (error.message) {
      return reply.status(400).send({ error: error.message });
    }

    // 3. Prisma'nın veritabanı çakışma hataları
    if (error.code === 'P2002') {
      return reply.status(400).send({ error: "Bu bilgilerle zaten kayıtlı bir abonelik var." });
    }

    // 4. Genel sunucu hatası
    return reply.status(500).send({ error: "Sunucu hatası, lütfen tekrar deneyin." });
  }
};

const show = async (req, reply) => await service.getById(req.params.id);

module.exports = { index, store, show, getPending, approve };