const Post = require("../model/postModel.js");

const createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);

    res.status(201).json("Post saved successfully!");
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = { createPost };
