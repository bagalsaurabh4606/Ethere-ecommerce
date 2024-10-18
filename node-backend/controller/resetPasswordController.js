const userModel = require("../models/userModels");
const bcrypt = require("bcrypt");

const resetPasswordController = async (req, res) => {
  const { userEmail, newPassword } = req.body;

  console.log("got userEmail and new password",userEmail,newPassword)
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

    // Hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    // Respond with success
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
