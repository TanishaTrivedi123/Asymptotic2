const express = require("express");
const { forgotPassword, verifyResetToken, resetPassword } = require("../controllers/passwordController");
const router = express.Router();

//forgot password route
router.post("/forgot-password", forgotPassword)

//before reset password first verify the token then open "reset password page";
router.get("/verify-reset-token/:token", verifyResetToken);

//reset password route
router.post("/reset-password/:token", resetPassword)

module.exports = router;