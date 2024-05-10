const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const authenticateToken = (req, res, next) => {
  //next() pushes the control from the middleware to the endpoint controller if the user is authenticated
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1]; //Bearer nndolnvl

  if (!token) {
    res.status(400).json({ msg: "Token is missing!" });
    return;
  }

  jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, user) => {
    if (error) {
      res.status(401).json({ msg: "Invalid token" });
      return;
    }

    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
