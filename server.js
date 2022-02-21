// load environment variables from .env file
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const path = require("path");
const bodyParser = require("body-parser");

require("./auth/microsoft-auth")(passport);
require("./authenticate");

const app = express();

const port = process.env.PORT || 5000;

// connect to the mongodb database
mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "studynetwork",
});

app.use(express.urlencoded({ extended: true }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      dbName: "studynetwork",
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

const userRouter = require("./routes/user_routes");
const postRouter = require("./routes/post_routes");
const statRouter = require("./routes/stat_routes");

// user related routes
app.use("/users", userRouter);
// post related routes
app.use("/posts", postRouter);
// statistic related routes
app.use("/stats", statRouter);

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

// direct the default route to the static folder client/build
app.use(express.static(path.join(__dirname, "client/build")));

// auth routes
app.get("/auth/microsoft/failure", (req, res) => {
  res.send("Authentication failed");
});

app.get(
  "/auth/microsoft",
  passport.authenticate("microsoft", { scope: ["user.read"] })
);

app.get(
  "/auth/microsoft/callback",
  passport.authenticate("microsoft", {
    failureRedirect: "/auth/microsoft/failure",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect(process.env.WEBAPP_URL + "/profile");
  }
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).send("Sorry, that route does not exist. 🤷‍♂️");
});

// handles react routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
