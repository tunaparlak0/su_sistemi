const service = require('../services/subsLog.service');

const index = async (req, reply) => {
    try {
        const logs = await service.getAllLogs();
        return reply.send(logs);
    } catch (error) {
        return reply.status(500).send({ error: "Loglar getirilemedi." });
    }
};

const getBySubscription = async (req, reply) => {
    try {
        const { subscriptionId } = req.params;
        const logs = await service.getBySubscriptionId(subscriptionId);
        return reply.send(logs);
    } catch (error) {
        return reply.status(500).send({ error: "Abonelik logları getirilemedi." });
    }
};

// Yeni eklenen POST fonksiyonu
const store = async (req, reply) => {
    try {
        // meterNo artık body'den gelmiyor, servis kendi üretiyor
        const { subscriptionId, action, oldOwnerId } = req.body;
        const newLog = await service.createLog(subscriptionId, action, oldOwnerId);
        return reply.status(201).send(newLog);
    } catch (error) {
        return reply.status(500).send({ error: "Log kaydedilemedi.", details: error.message });
    }
};

module.exports = { index, getBySubscription, store };