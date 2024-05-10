const express = require("express");
const { signupUser, loginUser } = require("../controller/userController.js");
const { uploadImage, getImage } = require("../controller/imageController.js");
const { upload } = require("../utils/upload.js");
const {authenticateToken} = require("../controller/jwtController.js")
const { createPost } = require("../controller/postController.js");

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);

router.post("/file/upload", upload.single("file"), uploadImage); //format = (url,middleware,controller)
router.get("/file/:filename", getImage);

router.post("/create", authenticateToken, createPost);

module.exports = router;
