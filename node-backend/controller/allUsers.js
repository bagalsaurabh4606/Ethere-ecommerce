const userModel = require("../models/userModels");

async function allUsers(req,res){
  try{
 console.log("allusers",req.userId)
 const allusers= await userModel.find()

 res.json({
  message:"All Users Fetched",
  success:true,
  error:false,
  data:allusers,

 })
  }catch(err){
    res.status(400).json({
      message:err.message || err,
      error:true,
      success:false
    })
  }
}

module.exports=allUsers;