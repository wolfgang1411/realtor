const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  number: Number,
});

module.exports = User = mongoose.model("user", UserSchema);
