const express = require("express");
const { validationResult, check } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");
const User = require("../model/User");
const route = express.Router();

route.post(
  "/",
  [
    check("username", "Username is Requiered").not().isEmpty(),
    check("email", "Email is Required").not().isEmpty(),
    check("email", "Envalid Email").notEmpty().isEmail(),
    check("password", "Password is Required").not().isEmpty(),
    check("number", "Number is required").not().isEmpty(),
    check("number", "Number must be numeric").notEmpty().isNumeric(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { username, password, email, number } = req.body;
      let user = await User.findOne({ email: email });
      if (user) return res.json({ error: "User Already Exist" });
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt);
      user = new User({ username, password: hashPassword, email, number });
      await user.save();
      const payload = { id: user.id };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 300000 },
        (error, token) => {
          if (error) throw error;
          res.json({ token, user }).status(200);
        }
      );
    } catch (error) {
      console.log(error);
      return res.status("400").json({ errors: "Server Error" });
    }
  }
);

module.exports = route;
