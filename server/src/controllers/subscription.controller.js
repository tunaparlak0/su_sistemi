const service = require('../services/subscription.service');

const index = async () => await service.getAll();

const store = async (req, reply) => {
  try {
    const result = await service.createSubscriptionRequest(req.body); 
    return reply.status(201).send(result);
  } catch (error) {
  console.error("🔥 HATA DETAYI:", error); 

  if (error.code === 'P2002') {
    // Hatanın hangi alandan kaynaklanıyor
    const field = error.meta?.target || "bilgiler"; 
    return reply.status(400).send({ 
      error: `Bu ${field} ile zaten kayıtlı bir abonelik bulunmaktadır.` 
    });
  }
  
  return reply.status(500).send({ error: "Sunucu hatası." });
}
};

const show = async (req) => await service.getById(req.params.id);

module.exports = { index, store, show };