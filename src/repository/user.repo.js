const userModel = require("../repository/user.repo");


const findUserById = async (id) => {
  return await userModel.findOne({ id });
};

module.exports = {
  findUserById,
};
