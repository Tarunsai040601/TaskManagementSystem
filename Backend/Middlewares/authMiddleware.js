const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(404).json({ message: "authHeader required" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(404).json({ message: "token required" });
    }
    const decode = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = decode;
    console.log("decode:", decode);
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Invalid token", error_message: error.message });
  }
};
module.exports = authMiddleware;
