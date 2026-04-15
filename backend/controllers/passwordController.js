//forgot and reset password logic

//Step-1:- forgot password logic
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");  //used in reset-password
const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");

const forgotPassword = async(req,res) => {
    try{
     const {email} = req.body;

     const user = await User.findOne({email});

     if(!user){
        return res.status(404).json({message: "User not found"});
     }

     const token = jwt.sign(
        {id: user.id},
        process.env.JWT_SECRET,
        {expiresIn: "15m"},
     );

     const resetLink = `http://localhost:5173/reset-password/${token}`;

     const htmlContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; line-height: 1.6; background-color: #f7f9fc; padding: 20px; border-radius: 10px;">
        <h2 style="color: #2a7cf7; text-align: center;">🔐 Password Reset Request</h2>
        <p>Hi <b>${user.username || "there"}</b>,</p>
        <p>We received a request to reset your password for your <b>Asymptotic</b> account.</p>
        <p>To reset your password, click the button below. This link will expire in <b>15 minutes</b>.</p>

        <div style="text-align: center; margin: 25px 0;">
          <a href="${resetLink}" target="_blank"
            style="background-color: #2a7cf7; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500;">
            Reset Password
          </a>
        </div>

        <p>If you didn’t request this, you can safely ignore this email — your password will remain unchanged.</p>

        <p style="margin-top: 30px;">Warm regards,<br><b>The Asymptotic Team 🚀</b></p>
        <hr style="border: none; border-top: 1px solid #ddd; margin-top: 20px;">
        <small style="display: block; text-align: center; color: #777;">
          This is an automated message. Please do not reply to this email.
        </small>
      </div>
    `;
     

     await sendEmail(
        email,
        "Reset your Asymptotic Password",
        htmlContent
     )

     res.json({message: "Password reset link sent to your email!"});
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: "Failed to send reset link. Please try again after some time"})
    }
}

// Step-2 :- verify reset-token
const verifyResetToken = async (req,res) => {
  try{
    const token = req.params.token;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if(!user){
      return res.status(400).json({valid: false, message: "User no longer exists"});
    }

    return res.json({valid: true});
  }
  catch(error){
    return res.status(400).json({valid: false, message: "Invalid or expired token"})
  }
}

//Step-3 :- Reset-password logic
const resetPassword = async (req,res) => {
  try{
  const token = req.params.token;

  const {newPassword, confirmPassword} = req.body;

  if(newPassword != confirmPassword){
    return res.status(400).json({message: "Password do not match"});
  }

  const decoded = jwt.verify(token,process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);

  if(!user){
    return res.status(404).json({message: "User not found"});
  }

  const hashPassword = await bcrypt.hash(newPassword,10);

  user.password = hashPassword;
  await user.save();

  res.json({message: "Password reset successful!"})
  }
  catch(error){
    return res.status(400).json({message: "Invalid or expired token"});
  }
}

module.exports= {forgotPassword, verifyResetToken, resetPassword}