const Post = require("../model/postModel.js");

const createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getAllPosts = async (req, res) => {
  const category = req.query.category;
  let posts;
  try {
    if (category) {
      posts = await Post.find({ categories: category }); //bring the whole database
    } else {
      posts = await Post.find({}); //bring the whole database
    }
    // console.log(posts);
    res.status(201).json(posts);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getPost = async (req, res) => {
  try {
    // console.log(req.params.id);
    const post = await Post.findById(req.params.id);
    // console.log(post);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // console.log(req.params.id);
    // console.log(req.body);

    if (!post) {
      res.status(404).json({ msg: "Post not found" });
      return;
    }

    await Post.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    }); //$set -> to replace an object, $addToSet -> to append an object in an array
    // console.log();
    res.status(200).json({ msg: "Post updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json({ msg: "Post not found" });
      return;
    }

    await Post.deleteOne(post);

    res.status(200).json({ msg: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createPost, getAllPosts, getPost, updatePost, deletePost };
