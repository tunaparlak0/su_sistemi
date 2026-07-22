const prisma = require('../config/prisma');
const { generateInvoiceId } = require('../utils/idGenerator');
const getAll = async () => await prisma.subscription.findMany();

const findPending = async () => await prisma.subscription.findMany({ 
    where: { status: "PENDING" } 
});

const updateStatus = async (id, status) => {
    return await prisma.subscription.update({
        where: { id: id },
        data: { status }
    });
};

const createSubscriptionRequest = async (data) => {
    // 1. Gelen veriyi güvenle al
    const { name, surname, mail, telephone, address, idNo, meterNo } = data;

    // 2. Zorunlu alan kontrolü (Hata yönetimini kolaylaştırır)
    if (!meterNo) {
        throw new Error("Sayaç numarası zorunludur.");
    }

    // 3. Sayaç kontrolü: Bu sayaçta aktif biri var mı?
    const activeSubscription = await prisma.subscription.findFirst({
        where: { 
            meterNo: meterNo, 
            status: "ACTIVE" 
        }
    });

    if (activeSubscription) {
        throw new Error("Bu sayaç numarasına ait halihazırda aktif bir abonelik bulunmaktadır.");
    }

    // 4. Kullanıcıyı ve aboneliği oluştur
    return await prisma.user.create({
        data: {
            name,
            surname,
            mail,
            telephone,
            subscription: {
                create: {
                    meterNo: meterNo, // Formdan gelen numarayı kullan
                    idNo,
                    address,
                    status: "PENDING",
                    dueDate: new Date(new Date().setDate(new Date().getDate() + 10))
                }
            }
        }
    });
};
const getById = async (id) => {
    return await prisma.subscription.findUnique({
        where: { id: id },
        include: { owners: { select: { name: true, surname: true } } }
    });
};

module.exports = { getAll, createSubscriptionRequest, getById, findPending, updateStatus };