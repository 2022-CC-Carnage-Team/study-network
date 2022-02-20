const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");

const { ensureAuth } = require("../authenticate");

router.get("/me", ensureAuth, (req, res, next) => {
  res.json({ user: req.user });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
