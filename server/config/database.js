const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to db!"))
  .catch(() => console.log("Connection failed."));

module.exports = connection;
