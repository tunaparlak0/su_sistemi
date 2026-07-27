const userService = require('../services/user.service');

const getUsers = async (req, reply) => {
  try {
    const users = await userService.getAllUsersWithSubscriptions();
    return reply.code(200).send(users);
  } catch (error) {
    return reply.code(500).send({ error: error.message });
  }
};

module.exports = { getUsers };