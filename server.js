// load environment variables from .env file
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

require("./auth/google-auth")(passport);
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
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

const userRouter = require("./routes/user_routes");

// user related routes
app.use("/users", userRouter);

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

// create default route
app.get("/", (req, res) => {
  // get the currently logged in user from the session
  const user = req.user;
  res.send(`
    <h1>Hello ${user ? `${user.firstName} ${user.lastName}` : "Guest"}</h1>
    <a href="auth/google">Login with Google</a>
    <br>
    <a href="/users/logout">Logout</a>
  `);
});

// auth routes
app.get("/auth/google/failure", (req, res) => {
  res.send("Authentication failed");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/google/failure",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

// create a basic GET route
app.get("/backend_server", (req, res) => {
  res.send({ express: "Hello World from backend server..." });
});