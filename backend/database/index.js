const mongoose = require("mongoose");
const configs = require("../configs");

const MONGO_URL = configs.DATABASE_URL;

exports.connect = async function () {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");
  } catch (err) {
    console.error(err);
  }
};