const prisma = require('../config/prisma');
const { generateAdminToken } = require('../utils/idGenerator');

// Standart Kullanıcı Oluşturma
const createUser = async (data) => {
    return await prisma.user.create({
        data: {
            ...data,
            role: 'USER' 
        }
    });
};

// Admin Oluşturma 
const createAdmin = async (data) => {
    try {
        const generatedToken = generateAdminToken();

        return await prisma.user.create({
            data: {
                ...data,
                role: 'ADMIN',
                token: generatedToken
            }
        });
    } catch (error) {
        console.error("Prisma Hatası:", error);
        throw error;
    }
};

const getAllUsers = async () => await prisma.user.findMany();

module.exports = { createUser, createAdmin, getAllUsers };