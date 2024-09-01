const addtoBagModel = require("../models/addtoBagModel");

const getBagProductController=async(req,res)=>{
  try{
    const currentuser=req.userId;
    const bagProducts=await addtoBagModel.find({userId:currentuser})
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