const userModel = require("../models/userModels");

const otpVerificationController = async (req, res) => {
  const { userEmail, otp } = req.body; // Assuming the email and OTP are sent in the request body
  console.log("Verifying OTP for:", userEmail);
  console.log("Verifying OTP for:", otp);

  try {
    // Check if the user exists
    const user = await userModel.findOne({ email: userEmail });
    if (!user) {
      return res.json({
        message: "User not found.",
        error: true,
        success: false,
      });
    }

    // Check if the OTP matches and has not expired
    const currentTime = Date.now();
    if (user.otp === otp && user.otpExpires > currentTime) {
      // OTP is valid
      console.log("OTP verified successfully.");

      // Clear OTP after successful verification
      user.otp = null;
      user.otpExpires = null;
      await user.save();

      // Respond with success message
      return res.json({
        message: "OTP verified successfully. You can now reset your password.",
        error: false,
        success: true,
      });
    } else {
      // OTP is invalid or has expired
      return res.json({
        message: "Invalid OTP or OTP has expired.",
        error: true,
        success: false,
      });
    }
  } catch (err) {
    return res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports=otpVerificationController;
