const workerService = require('../services/worker.service');

const createWorker = async (req, reply) => {
  try {
    const performedByWorkerId = req.user.id; // Token'dan gelen admin ID
    const result = await workerService.createWorker(req.body, performedByWorkerId);

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
    // Token zaten adminAuth middleware'inden geçti, doğrudan servisi çağırıyoruz
    const workers = await workerService.getAllWorkers();

    return reply.code(200).send(workers);
  } catch (error) {
    return reply.code(403).send({ error: error.message });
  }
};

const updateWorker = async (req, reply) => {
  try {
    const performedByWorkerId = req.user.id; // Token'dan gelen admin ID
    const result = await workerService.updateWorker(req.params.id, req.body, performedByWorkerId);
    return reply.code(200).send(result);
  } catch (error) {
    return reply.code(400).send({ error: error.message });
  }
};
const getWorkerLogs = async (req, reply) => {
  try {
    const logs = await workerService.getWorkerLogs();
    return reply.code(200).send(logs);
  } catch (error) {
    return reply.code(500).send({ error: error.message });
  }
};
module.exports = { createWorker, getAllWorkers, updateWorker, getWorkerLogs };