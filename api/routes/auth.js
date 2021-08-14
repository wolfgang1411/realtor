const express = require("express");
const { validationResult, check } = require("express-validator");
const bcrypt = require("bcryptjs");
const config = require("config");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");
const { Error } = require("mongoose");
const route = express.Router();

route.get("/", [auth], async (req, res) => {
  try {
    const user = await User.findOne({ id: req.userId }).select("-password");
    console.log(user);
    if (user) return res.json(user);
    else throw new Error({ msg: "User not Found" });
  } catch (error) {
    return res.json({ error: error });
  }
});

route.post(
  "/",
  [
    check("email", "Email is Required").not().isEmpty(),
    check("email", "Envalid Email").notEmpty().isEmail(),
    check("password", "Password is Required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() }).status(400);
    }
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.json({ error: "Invalid Creadentials" });
      }
      const isMatch = bcrypt.compareSync(password, user.password);
      if (isMatch) {
        const payload = {
          id: user.id,
        };

        jwt.sign(
          payload,
          config.get("jwtSecret"),
          { expiresIn: 30000 },
          (error, token) => {
            if (error) throw error;
            res.json(token).status(200);
          }
        );
      } else {
        return res.status(400).json({ error: "Invalid Credentails" });
      }
    } catch (error) {
      res.json({ errors: error });
    }
  }
);

module.exports = route;
