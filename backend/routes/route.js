const express = require("express");
const { signupUser, loginUser } = require("../controller/userController.js");
// const { uploadImage, getImage } = require("../controller/imageController.js");
// const { upload } = require("../utils/upload.js");
const { authenticateToken } = require("../controller/jwtController.js");
const {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
} = require("../controller/postController.js");
const {
  newComment,
  getComments,
  deleteComment,
} = require("../controller/commentController.js");

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);

//router.post("/file/upload", upload.single("file"), uploadImage); //format = (url,middleware,controller)
//router.get("/file/:filename", getImage);

router.post("/create", authenticateToken, createPost);
router.get("/posts", authenticateToken, getAllPosts);
router.get("/post/:id", authenticateToken, getPost);
router.put("/update/:id", authenticateToken, updatePost);
router.delete("/delete/:id", authenticateToken, deletePost);

router.post("/comment/new", authenticateToken, newComment);
router.get("/comments/:id", authenticateToken, getComments);
router.delete("/comment/delete/:id", authenticateToken, deleteComment);

module.exports = router;
