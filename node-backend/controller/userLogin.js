const  bcrypt = require('bcryptjs')
const userModel = require("../models/userModels")
const jwt=require('jsonwebtoken')
async function userLoginINController(req,res){
try{
  const {email,password}=req.body
  if(!email){
    throw new Error("please provide email")
}
if(!password){
  throw new Error("please provide password")
}
  
const user=await userModel.findOne({email})
if(!user){
  throw new Error("User Not Found")
}

const checkPassword=await bcrypt.compareSync(password,user.password)
console.log("check password",checkPassword)

if(checkPassword){
  const tokenData={
 _id:user._id,
 email:user.email
  }
 const token= await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 *8 });

 const tokenOption={
  httpOnly:true,
  secure:true

 }
 res.cookie("token",token,tokenOption).json({
  message:"Logged in successfully",
  data:token,
  success:true,
  error:false
 })
}else{
  throw new Error("Password is incorrect")
}


}catch(err){
  res.json({
    message:err.message || err ,
    error:true,
    success:false,
  });
}
}

module.exports=userLoginINController;