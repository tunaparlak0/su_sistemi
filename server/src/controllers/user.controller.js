const userService = require('../services/user.service');

const store = async (req, reply) => {
  try {
    const user = await userService.createUser(req.body);
    return reply.status(201).send(user);
  } catch (err) {
    return reply.status(500).send({ message: "Kullanıcı oluşturulamadı", error: err.message });
  }
};
const storeAdmin = async (req, reply) => {
  try {
    const admin = await userService.createAdmin(req.body);
    return reply.status(201).send({ 
      message: "Admin başarıyla oluşturuldu.",
      adminId: admin.id, 
      token: admin.token 
    });
  } catch (err) {
    return reply.status(500).send({ message: "Admin oluşturulamadı", error: err.message });
  }
};
const index = async (req, reply) => {
  return await userService.getAllUsers();
};

module.exports = { store, storeAdmin, index };