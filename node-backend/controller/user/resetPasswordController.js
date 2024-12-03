const jwt = require("jsonwebtoken");
const userModel = require("../../models/userModels");
const bcrypt = require("bcrypt");

const resetPasswordController = async (req, res) => {
  const { userEmail, token, newPassword } = req.body;

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.email !== userEmail) {
      return res.json({
        message: "Invalid token or email mismatch.",
        error: true,
        success: false,
      });
    }

    // Check if the user exists
    const user = await userModel.findOne({ email: userEmail });
    if (!user) {
      return res.json({
        message: "User not found.",
        error: true,
        success: false,
      });
    }

    // Hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    return res.json({
      message: "Password updated successfully!",
      error: false,
      success: true,
    });
  } catch (err) {
    return res.json({
      message: err.message || "An error occurred while updating the password.",
      error: true,
      success: false,
    });
  }
};

module.exports = resetPasswordController;
