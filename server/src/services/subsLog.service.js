const prisma = require('../config/prisma');
const formatMeterNo = (num) => `SK-${String(num).padStart(6, '0')}`;
const createLog = async (subscriptionId, action, oldOwnerId = null) => {
    // 1. Mevcut en yüksek sayaç numarasını bul
    const lastLog = await prisma.subscriptionLog.findFirst({
        orderBy: { meterNo: 'desc' }
    });

    let nextNumber = 1;
    if (lastLog && lastLog.meterNo) {
        // "SK-000123" kısmındaki sayıyı al ve 1 artır
        const currentNum = parseInt(lastLog.meterNo.split('-')[1]);
        nextNumber = currentNum + 1;
    }

    const newMeterNo = formatMeterNo(nextNumber);

    // 2. Yeni logu otomatik üretilen meterNo ile kaydet
    return await prisma.subscriptionLog.create({
        data: {
            meterNo: newMeterNo,
            subscriptionId,
            action,
            oldOwnerId
        }
    });
};

const transferSubscription = async (oldSubId, meterNo) => {
    await prisma.subscription.update({
        where: { id: oldSubId },
        data: { status: "CANCELLED" }
    });

    await createLog(meterNo, oldSubId, "TRANSFER", oldSubId);
};

const getAllLogs = async () => {
    return await prisma.subscriptionLog.findMany({
        orderBy: { changedAt: 'desc' }
    });
};

const getBySubscriptionId = async (subscriptionId) => {
    return await prisma.subscriptionLog.findMany({
        where: { subscriptionId },
        orderBy: { changedAt: 'desc' }
    });
};

module.exports = { createLog, transferSubscription, getAllLogs, getBySubscriptionId };