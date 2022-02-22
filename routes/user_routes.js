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

router.get("/fetch", (req, res, next) => {
  // get id from query
  let id = req.query.id;

  // find user with id
  User.findOne({ "microsoft.id": id }).exec(function (err, user) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      // process user
      user = processUser(user);

      // return user
      res.status(200).send({ user: user });
    }
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.WEBAPP_URL + "/");
});

module.exports = router;
