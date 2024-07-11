"use strict";
const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const {authentication} = require("../../middleware/authentication");

router.get("/",authentication, asyncHandler(async (req, res) => {}));

module.exports = router;
