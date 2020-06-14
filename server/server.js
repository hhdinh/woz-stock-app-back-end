const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const app = express();
const { db } = require("./db/");
const User = require("./db/models/user");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const dbStore = new SequelizeStore({ db });

// Using SequelizeStore to create/sync the database table.
dbStore.sync();

// Each subsequent request will not contain credentials, but rather the unique cookie that identifies the session.
passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (error) {
    done(error);
  }
});

// Logging middleware
app.use(morgan("dev"));

// Parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  secret should be a randomly unique string for your application.
app.use(session({
  secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
  store: dbStore,
  resave: false,
  saveUninitialized: false
}));
// initialises the authentication modul
app.use(passport.initialize());
// uses persistent login sessions, passport.session() middleware must also be used.
app.use(passport.session());


// Handle CORS issues at these routes
app.use(cors());
app.use("/auth", require("./auth"));
app.use("/api", require("./api"));
app.use("/", (req, res, next) => res.send("Welcome"));

// Handle any unknow routes
app.use("*", (req, res, next) => {
  let err = new Error("Not Found");
  err.statusCode = 404;
  next(err);
});

// 404
app.use(function (req, res, next) {
  const err = new Error("not found.");
  err.status = 404;
  next(err);
});

// 500
app.use((err, req, res) => {
  console.error("This is the error from server.js ", err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal servers error ");
});

module.exports = app;