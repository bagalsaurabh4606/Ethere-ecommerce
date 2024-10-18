// const userModel = require("../models/userModels");

// const forgotPasswordController = async(req,res)=>
// {
//   const {userEmail} = req.body;
//   console.log("userrrr email",userEmail)

//   try{

    
//     const email=await userModel.findOne({email:userEmail})
//     if(!email){
//       res.json({
//         message:"E-mail Not Registered",
//         error:true,
//         success:false
//       })
//     }
//     console.log("email in forgot password", email);

//   }
//   catch(err){
//     res.json({
//       message:err.message || err ,
//       error:true,
//       success:false,
//     });
//   }
// }

// module.exports =forgotPasswordController;



const userModel = require("../models/userModels");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const forgotPasswordController = async (req, res) => {
  const { userEmail } = req.body;
  console.log("User email:", userEmail);

  try {
    // Check if the email is registered
    const user = await userModel.findOne({ email: userEmail });
    if (!user) {
      return res.json({
        message: "E-mail Not Registered",
        error: true,
        success: false,
      });
    }

    // Generate a 4-digit OTP
    const otp = crypto.randomInt(1000, 9999).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes

    // Update user with OTP and expiration
    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    // Configure Nodemailer to send email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL, // Your email address
        pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL,
      to: userEmail,
      subject: "Your OTP for Password Reset",
      text: `Your OTP for resetting the password is ${otp}. This OTP is valid for 10 minutes.`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    console.log(`OTP sent to ${userEmail}: ${otp}`);

    // Respond with success message
    res.json({
      message: "OTP sent to your registered email",
      error: false,
      success: true,
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = forgotPasswordController;
