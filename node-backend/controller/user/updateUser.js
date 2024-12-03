
const userModel = require("../../models/userModels");

async function updateUser(req,res){
  try{

    const sessionUser=req.userId //find session id

const {userId , email , name , role,createdAt}=req.body

const payload={
  ...(email && {email:email}),
  ...(name && {name:name}),
  ...(role && {role:role}),

}
//check user is admin or not 
const user=await userModel.findById(sessionUser)
console.log("user_role",user.role)

const updateUser=await userModel.findByIdAndUpdate(userId,payload) //,{ new: true }


  res.json({
    data:updateUser,
    message:"User Updated",
    success:true,
    error:false
  })


  }catch(err){
    res.status(400).json({
      message:err.message || err,
      error:true,
      success:false
    })
  }
}

module.exports=updateUser;