const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");

const { processUser } = require("../utility.js");
const { ensureAuth } = require("../authenticate");

router.get("/me", ensureAuth, (req, res, next) => {
  req.user = processUser(req.user);
  res.json({ user: req.user });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.WEBAPP_URL + "/");
});

module.exports = router;
