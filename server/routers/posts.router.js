const { Router } = require("express");

// Middleware
const verifyToken = require("../middlewares/verifyToken");

// Controllers
const {
  getPosts,
  getUserPosts,
  likePost,
} = require("../controllers/posts.controller");

// Router
const postsRouter = Router();

// get all posts
postsRouter.get("/", verifyToken, getPosts);
// get post of a specific user
postsRouter.get("/:userId", verifyToken, getUserPosts);

// like or unlike a post
postsRouter.patch("/:postId", verifyToken, likePost);

module.exports = postsRouter;
