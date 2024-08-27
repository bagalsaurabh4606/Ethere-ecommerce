const addtoBagModel = require("../models/addtoBagModel");

const getBagProductController=async(req,res)=>{
  try{
    const currentuser=req.userId;
    console.log("useridddddd",currentuser)
    
    // console.log("productttttttt",products)
    const bagProducts=await addtoBagModel.find({userId:currentuser})
    console.log("dekh aa raha hai ya nahi ",bagProducts)
    res.json({
      error:false,
      success:true,
      data:bagProducts,
    })
  }catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports=getBagProductController;