const userModel = require("../models/userModels")

const uploadProductPremission= async (userId)=>{
  const user=await userModel.findById(userId);

  if(user.role==="ADMIN"){return true}
  return false
}

module.exports=uploadProductPremission