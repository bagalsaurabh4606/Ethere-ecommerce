const jwt = require("jsonwebtoken"); // Add JWT for token generation
const userModel = require("../../models/userModels");

const otpVerificationController = async (req, res) => {
  const { userEmail, otp } = req.body;

  try {
    const user = await userModel.findOne({ email: userEmail });
    if (!user) {
      return res.json({
        message: "User not found.",
        error: true,
        success: false,
      });
    }

    const currentTime = Date.now();
    if (user.otp === otp && user.otpExpires > currentTime) {
      // OTP is valid
      console.log("OTP verified successfully.");
      user.otp = null;
      user.otpExpires = null;
      await user.save();

      // Generate a token for password reset with a short expiry time (e.g., 15 minutes)
      const resetToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '15m' });

      return res.json({
        message: "OTP verified successfully. You can now reset your password.",
        error: false,
        success: true,
        resetToken:resetToken, // Send token to the client
      });
    } 
    else {
      console.log("OTP not verified at all.");
      return res.json({
        message: "Invalid OTP or OTP has expired.",
        error: true,
        success: false,
      });
    }
  } catch (err) {
    return res.json({
      message: err.message || "An error occurred.",
      error: true,
      success: false,
    });
  }
};

module.exports = otpVerificationController;
