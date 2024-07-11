"use strict";
const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const passport = require("passport");
const authController = require("../../controller/auth.controller");

router.get(
  "/google",
  asyncHandler(
    passport.authenticate("google", {
      scope: ["profile", "email"],
      session: false,
    })
  )
);

router.get(
  "/google/callback",
  asyncHandler((req, res, next) => {
    passport.authenticate("google", (err, profile) => {
      req.user = profile;
      next();
    })(req, res, next);
  }),
  asyncHandler((req, res) => {
    res.redirect(
      `${process.env.CLIENT_URL}/login?token=${req.user.tokenLogin}&id=${req.user?.id}`
    );
  })
);

router.post("/login", asyncHandler(authController.login));
router.post("/logout", asyncHandler(authController.logout));
router.post("/checkAuth", asyncHandler(authController.checkAuth));

module.exports = router;
