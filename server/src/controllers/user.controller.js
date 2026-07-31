const userService = require('../services/user.service');

const getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsersWithSubscriptions();
    return res.code(200).send(users);
  } catch (error) {
    return res.code(500).send({ error: error.message });
  }
};

module.exports = { getUsers };