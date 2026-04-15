const express = require("express");
const router = express.Router();
const validateSignup = require("../middlewares/validateSignup");
const {signupUser, loginUser, userData} = require("../controllers/authController");
const validateLogin = require("../middlewares/validateLogin");
const { authMiddleware } = require("../middlewares/authMiddleware");

//Signup Route
router.post("/signup", validateSignup, signupUser);

//Login Route
router.post("/login", validateLogin, loginUser);

//route to get user
router.get("/getUser", authMiddleware, userData)

module.exports = router;