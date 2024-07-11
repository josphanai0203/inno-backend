const { verifyToken } = require("../service/jwt.service");

const authentication = async (req, res, next) => {
  const jwt = req.header("authorization");
  const id = req.header("x-client-id");
  if (!jwt || !id) {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
    });
  }
  const verifyToken = await verifyToken(jwt);
  if (!verifyToken) {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
    });
  }
  if (verifyToken.id !== id) {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
    });
  }
  req.user = verifyToken;
  next();
};

module.exports = authentication;
