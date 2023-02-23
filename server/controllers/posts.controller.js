const { User, Post } = require("../models");

// Creating a New Post
const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;

    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstname,
      lastName: user.lastname,
      location: user.location,
      description,
      picturePath,
      userPicturePath: user.picturePath,
      likes: [],
      comments: [],
    });

    await newPost.save();

    const posts = await Post.find();
    res.sent(201).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrives all the available posts in the application
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.sent(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// gets all the posts of a specific user
const getUserPosts = async (req, res) => {
  try {
    const userId = req.params.userId;
    const posts = await Post.find({ userId });
    res.sent(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const likePost = async (req, res) => {
  try {
    const { postId } = req.headers;
    const { userId } = req.body;

    const post = await Post.findById(postId);

    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createPost, getPosts, getUserPosts, likePost };
