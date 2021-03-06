const mongoose = require("mongoose");
const config = require("config");

const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("connected DB");
  } catch (err) {
    console.log(err.massage);
    process.env.Exit;
  }
};

module.exports = connectDB;
