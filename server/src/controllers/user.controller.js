const userService = require('../services/user.service');

const store = async (req, reply) => {
  try {
    const user = await userService.createUser(req.body);
    return reply.status(201).send(user);
  } catch (err) {
    return reply.status(500).send({ message: "Kullanıcı oluşturulamadı", error: err.message });
  }
};

const index = async (req, reply) => {
  return await userService.getAllUsers();
};

module.exports = { store, index };