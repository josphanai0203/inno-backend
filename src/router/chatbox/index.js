"use strict";
const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const chatboxController = require("../../controller/chatbox.controller");

router.post("", asyncHandler(chatboxController.generateContent));

module.exports = router;
