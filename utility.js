const md5 = require("md5");

module.exports = {
  processUser: function (user) {
    let userNew = user;

    userNew.microsoft.profilePic =
      "https://www.gravatar.com/avatar/" +
      md5(user.microsoft.email.toLowerCase().trim()) +
      ".jpg";

    // remove token
    userNew.microsoft.token = "";

    return userNew;
  },
};
