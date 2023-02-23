const { Router } = require("express");

// Controllers
const {
  getUser,
  addOrRemoveFriend,
  getUserFriends,
} = require("../controllers/users.controller");

// Middlewares
const verifyToken = require("../middlewares/verifyToken.js");

// Router
const usersRouter = Router();

// Routes
usersRouter.get("/user/:userId", verifyToken, getUser);
usersRouter.get("/user/:userId/friends", verifyToken, getUserFriends);
usersRouter.get("/user/:userId/:friendId/:option", verifyToken, addOrRemoveFriend);

module.exports = usersRouter;
