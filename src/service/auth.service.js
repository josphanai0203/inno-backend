"use strict";

const { findUserById } = require("../repository/user.repo");
const { generateToken } = require("./jwt.service");

const handleLogin = async ({ id, tokenLogin }) => {
  const user = await findUserById(id);
  if (!user) {
    return {
      status: 404,
      message: "User not found",
    };
  }
  if (user.tokenLogin !== tokenLogin) {
    return {
      status: 401,
      message: "Unauthorized",
    };
  }
  const token = await generateToken({
    id: user.id,
    username: user.name,
    avatar: user.avatarUrl,
  });

  return {
    status: 200,
    message: "Success",
    data: {
      token,
    },
  };
};

module.exports = {
  handleLogin,
};
