const { Router } = require("express");

// Controllers
const { login } = require("../controllers/auth.controller");

// Router
const authRouter = Router();

// Login Route
authRouter.post("/login", login);

module.exports = authRouter;
