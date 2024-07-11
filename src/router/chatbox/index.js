"use strict";
const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

router.post("", asyncHandler());
module.exports = router;
