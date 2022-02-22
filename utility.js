const md5 = require("md5");

module.exports = {
  processUser: function (user) {
    let userNew = user;

    // make sure new user has microsoft object
    if (!userNew || !userNew.microsoft) {
      return null;
    }

    userNew.microsoft.profilePic =
      "https://www.gravatar.com/avatar/" +
      md5(user.microsoft.email.toLowerCase().trim()) +
      ".jpg";

    // remove token
    userNew.microsoft.token = "";

    return userNew;
  },
};
