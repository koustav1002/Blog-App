const User = require("../model/userModel.js");
const Token = require("../model/tokenModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const signupUser = async (req, res) => {
  try {
    const name = req.body.name;
    const username = req.body.username;

    if (await User.findOne({ username: username })) {
      res.status(400).json({ msg: "Username already exists!" });
      // throw new Error("Username already exists! Try something else.");
    }
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    // console.log(name, username, password);

    const user = await User.create({
      name,
      username,
      password,
    });
    res.status(201).json({
      name: name,
      username: username,
      password: password,
    });
  } catch (error) {
    // console.log("Failed to login")
    res.status(500);
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    res.status(400);
    // throw new Error("Incorrect username! Please try again.");
  }

  try {
    const match = await bcrypt.compare(password, user.password);
    // console.log(match);
    if (match) {
      //generate access token and refresh token
      // console.log("Password match");
      const accessToken = jwt.sign(
        { user: user },
        process.env.ACCESS_SECRET_KEY,
        {
          expiresIn: "15m",
        }
      ); //(body,secret_key,expires_in)
      const refreshToken = jwt.sign(
        { user: user },
        process.env.REFRESH_SECRET_KEY
      );

      const newToken = await Token.create({ token: refreshToken });

      res.status(201).json({
        accessToken: accessToken,
        refreshToken: refreshToken,
        name: user.name,
        username: user.username,
      });
    } else {
      res.status(400).json({ msg: "Password doesn't match!" });
      // throw new Error("Password not does not match!");
    }
  } catch (error) {
    res.status(500).json({ msg: "Some error occured" });
    // throw new Error("Some error occured! Please try again.");
  }
};

module.exports = { signupUser, loginUser };
