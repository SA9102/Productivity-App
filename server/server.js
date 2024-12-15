const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const cors = require("cors");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const generatePassword = require("./lib/passwordUtils").generatePassword;
require("dotenv").config();

const User = require("./models/User");

const app = express();

const port = 3000;

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS HERE
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

app.get("/", async (req, res) => {
  res.send({ message: "hello from postman!" });
});

app.post("/registerUser", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (user) {
      return res.json({ success: false, info: "username" });
    }

    const saltHash = generatePassword(req.body.password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;
    await User.create({ username: req.body.username, password: hash, salt });
    res.status(201);
    res.json({ success: true, info: "Account creation successful." });
  } catch (err) {
    res.json({
      success: false,
      info: "A server error occurred. Please try again.",
    });
  }
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(3000, () => {
      console.log("Connected and listening on port 3000");
    });
  })
  .catch((error) => console.log("There was an error"));
