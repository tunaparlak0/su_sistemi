const prisma = require('../config/prisma');
const { generateUserId, generateAdminToken } = require('../utils/idGenerator');

// Standart Kullanıcı Oluşturma
const createUser = async (data) => {
    const { name, surname, ...rest } = data;
    const newId = generateUserId(name, surname);

    return await prisma.user.create({
        data: {
            ...rest,
            id: newId,
            name: name,
            surname: surname,
            role: 'USER' 
        }
    });
};

// Admin Oluşturma 
const createAdmin = async (data) => {
    try {
        const { name, surname, mail, telephone, ...rest } = data;
        const newId = generateUserId(name, surname);
        const generatedToken = generateAdminToken();

        return await prisma.user.create({
            data: {
                ...rest,
                id: newId,
                name,
                surname,
                mail,
                telephone,
                role: 'ADMIN',
                token: generatedToken
            }
        });
    } catch (error) {
        console.error("Prisma Hatası:", error); // Terminalde hatanın detayını göreceksin
        throw error;
    }
};

const getAllUsers = async () => await prisma.user.findMany();

module.exports = { createUser, createAdmin, getAllUsers };