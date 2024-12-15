const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const cors = require("cors");
const MongoStore = require("connect-mongo");
const passport = require("passport");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
