// load environment variables from .env file
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const cors = require("cors");
const path = require("path");

require("./auth/google-auth")(passport);
require("./authenticate");

const app = express();

const port = process.env.PORT || 5000;

//Add the client URL to the CORS policy
const whitelist = process.env.WEBAPP_URL ? [process.env.WEBAPP_URL] : [];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },

  credentials: true,
};
app.use(cors(corsOptions));

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
const postRouter = require("./routes/post_routes");
const res = require("express/lib/response");

// user related routes
app.use("/users", userRouter);
// post related routes
app.use("/posts", postRouter);

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

// direct the default route to the static folder client/build
app.use(express.static(path.join(__dirname, "client/build")));

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
    res.redirect(process.env.WEBAPP_URL + "/profile");
  }
);
// create a basic GET route
app.get("/backend_server", (req, res) => {
  res.send({ express: "Hello World from backend server..." });

// post routes (testing only - will be removed in the near future)

// handles react routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
