const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).json({ msg: "No Token , Authorization Denied" });
  try {
    const decode = jwt.verify(token, config.get("jwtSecret"));
    res.userId = decode.id;
  } catch (error) {
    return res.json({ error: error });
  }
  next();
};
