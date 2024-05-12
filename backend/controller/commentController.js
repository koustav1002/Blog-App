const Comment = require("../model/commentModel");

const newComment = async (req, res) => {
  try {
    // console.log(req.body);
    const comment = await Comment.create(req.body);
    // console.log(comment);
    res.status(200).json({ msg: "Comment saved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.id });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      res.status(400).json({ msg: "message not found!" });
      return;
    }

    await Comment.deleteOne(comment);

    res.status(200).json({ msg: "Comment deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { newComment, getComments, deleteComment };
