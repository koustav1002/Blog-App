const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const Router = require("./routes/route.js");

const app = express();
dotenv.config();

connectDB();

app.use(express.json());

app.use("/", Router);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
