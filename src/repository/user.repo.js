const userModel = require("../model/user.model");


const findUserById = async (id) => {
  return await userModel.findOne({ id });
};

module.exports = {
  findUserById,
};
