const workerService = require('../services/worker.service');

const createWorker = async (req, reply) => {
  try {
    // 📌 Artık JWT kullanıyoruz, header'dan şifre aramaya gerek yok.
    const result = await workerService.createWorker(req.body);

    return reply.code(201).send({
      message: "Personel başarıyla oluşturuldu.",
      data: result
    });
  } catch (error) {
    return reply.code(400).send({ error: error.message });
  }
};

const getAllWorkers = async (req, reply) => {
  try {
    // 📌 Token zaten adminAuth middleware'inden geçti, doğrudan servisi çağırıyoruz
    const workers = await workerService.getAllWorkers();

    return reply.code(200).send(workers);
  } catch (error) {
    return reply.code(403).send({ error: error.message });
  }
};

const updateWorker = async (req, reply) => {
  try {
    const result = await workerService.updateWorker(req.params.id, req.body);
    return reply.code(200).send(result);
  } catch (error) {
    return reply.code(400).send({ error: error.message });
  }
};

module.exports = { createWorker, getAllWorkers, updateWorker };