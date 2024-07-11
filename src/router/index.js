const express = require("express");
const router = express.Router();

router.use("/chatbox", require("./chatbox"));
router.use("/auth", require("./auth"));
router.use("", require("./blog"));


module.exports = router;
