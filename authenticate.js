const passport = require("passport");
const dev = process.env.NODE_ENV !== "production";

module.exports = {
  // if user is authenticated the redirected to next page else redirect to login page
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/");
    }
  },

  ensureAuthNoRedirect: function (req) {
    if (req.isAuthenticated()) {
      return true;
    } else {
      return false;
    }
  },

  // if user is authenticated and going to login page then redirected to home page if not authenticated redirected to login page  .
  ensureGuest: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/auth/microsoft");
    }
  },
};
