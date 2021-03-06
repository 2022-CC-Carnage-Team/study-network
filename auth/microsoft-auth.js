var MicrosoftStrategy = require("passport-microsoft").Strategy;
const mongoose = require("mongoose");
const User = require("../models/user");

module.exports = function (passport) {
  passport.use(
    new MicrosoftStrategy(
      {
        clientID: process.env.MICROSOFT_CLIENT_ID,
        clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL,
        passReqToCallback: true,
        scope: ["user.read"],
      },
      async (req, accessToken, refreshToken, profile, done) => {
        //get the user data from microsoft
        const newUser = {
          microsoft: {
            email: profile.emails[0].value,
            id: profile.id,
            token: accessToken,
            refreshToken: refreshToken,
            profilePic: null, // microsoft doesn't give us profile pic
          },
          authStratgy: "microsoft",
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
        };

        try {
          //find the user in our database
          let user = await User.findOne({ "microsoft.id": profile.id });

          if (user) {
            //If user present in our database.
            done(null, user);
          } else {
            // if user is not preset in our database save user data to database.
            newUserMdl = await User.create(newUser);
            done(null, newUserMdl);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );

  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
