"use strict";

const { handleLogin } = require("../service/auth.service");

class AuthController {
  login = async (req, res, next) => {
    const { id, tokenLogin } = req?.body;
    if (!id || !tokenLogin) {
      return res.status(422).json({
        message: "Missing required fields",
      });
    }
    const response = await handleLogin({
      id,
      tokenLogin,
    });
    return res.status(response.status).json(response);
  };

  logout = async (req, res) => {
    return res.status(200).json({
      message: "Logout success",
    });
  };

  checkAuth = async (req, res) => {
    return res.status(200).json({
      message: "Authorized",
    });
  };
}

module.exports = new AuthController();
