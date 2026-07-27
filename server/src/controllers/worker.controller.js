const workerService = require('../services/worker.service');

const createWorker = async (req, reply) => {
  try {
    const adminPassword = req.headers['x-admin-password'];
    const adminId = req.headers['x-admin-id'];

    if (!adminId || !adminPassword) {
      return reply.code(401).send({ error: "Admin kimlik bilgileri eksik." });
    }

    const result = await workerService.createWorker(adminId, adminPassword, req.body);

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
    const adminPassword = req.headers['x-admin-password'];
    const adminId = req.headers['x-admin-id'];

    if (!adminId || !adminPassword) {
      return reply.code(401).send({ error: "Admin kimlik bilgileri eksik." });
    }

    const workers = await workerService.getAllWorkers(adminId, adminPassword);

    return reply.code(200).send(workers);
  } catch (error) {
    return reply.code(403).send({ error: error.message });
  }
};

const updateWorker = async (req, reply) => {
  try {
    const adminPassword = req.headers['x-admin-password'];
    const adminId = req.headers['x-admin-id'];

    if (!adminId || !adminPassword) {
      return reply.code(401).send({ error: "Admin kimlik bilgileri eksik." });
    }

    const result = await workerService.updateWorker(adminId, adminPassword, req.params.id, req.body);
    return reply.code(200).send(result);
  } catch (error) {
    return reply.code(400).send({ error: error.message });
  }
};


module.exports = { createWorker, getAllWorkers, updateWorker};