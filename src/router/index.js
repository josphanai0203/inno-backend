const express = require("express");
const router = express.Router();

router.use("/chatbox", require("./chatbox"));
router.use("/auth", require("./auth"));
module.exports = router;
