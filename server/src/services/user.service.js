    const prisma = require('../config/prisma');
    const { generateUserId } = require('../utils/idGenerator');

    const createUser = async (data) => {
    const { name, surname, ...rest } = data;
    const newId = generateUserId(name, surname);

    return await prisma.user.create({
        data: {
        ...rest,
        id: newId,
        name: name,      // Buraya ekledik
        surname: surname // Buraya ekledik
        }
    });
    };

    const getAllUsers = async () => await prisma.user.findMany();

    module.exports = { createUser, getAllUsers };