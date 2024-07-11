const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const generateToken = async (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const verifyToken = async (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const generateTokenLogin = async () => {
  return uuidv4();
};

module.exports = {
  generateToken,
  verifyToken,
  generateTokenLogin
};
