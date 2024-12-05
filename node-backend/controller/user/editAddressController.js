const userModel = require("../../models/userModels");



const editAddressController = async(req,res)=>{


  try{

    const { _id, ...addressData } = req.body;
    const userId = req.userId;

    console.log("address id",_id);
    console.log("remamiing body",addressData)

    const updatedUser = await userModel.findOneAndUpdate(
      { _id: userId, "addresses._id": _id },
      { $set: { "addresses.$": addressData } },
      { new: true }
    );

    res.status(200).json({
      data:updatedUser,
      message:"Address Updated Successfully",
      success:true,
      error:false,
    })



  }
  catch(err)
  {
    res.status(400).json({
      message:err.message || err,
      error:true,
      success:false,
    })
  }
}

module.exports=editAddressController;