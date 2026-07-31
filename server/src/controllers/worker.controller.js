const workerService = require('../services/worker.service');

const createWorker = async (req, res) => {
  try {
    const performedByWorkerId = req.user.id; // Token'dan gelen admin ID
    const result = await workerService.createWorker(req.body, performedByWorkerId);

    return res.code(201).send({
      message: "Personel başarıyla oluşturuldu.",
      data: result
    });
  } catch (error) {
    return res.code(400).send({ error: error.message });
  }
};

const getAllWorkers = async (req, res) => {
  try {
    // Token zaten adminAuth middleware'inden geçti, doğrudan servisi çağırıyoruz
    const workers = await workerService.getAllWorkers();

    return res.code(200).send(workers);
  } catch (error) {
    return res.code(403).send({ error: error.message });
  }
};

const updateWorker = async (req, res) => {
  try {
    const performedByWorkerId = req.user.id; // Token'dan gelen admin ID
    const result = await workerService.updateWorker(req.params.id, req.body, performedByWorkerId);
    return res.code(200).send(result);
  } catch (error) {
    return res.code(400).send({ error: error.message });
  }
};
const getWorkerLogs = async (req, res) => {
  try {
    const logs = await workerService.getWorkerLogs();
    return res.code(200).send(logs);
  } catch (error) {
    return res.code(500).send({ error: error.message });
  }
};
module.exports = { createWorker, getAllWorkers, updateWorker, getWorkerLogs };