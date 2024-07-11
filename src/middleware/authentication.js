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
  const decode = await verifyToken(jwt);
  if (!decode) {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
    });
  }
  if (decode.id !== id) {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
    });
  }
  req.user = decode;
  next();
};

module.exports = {
  authentication,
};
