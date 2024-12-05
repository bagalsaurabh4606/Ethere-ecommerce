const userModel = require("../../models/userModels");

const deleteAddressController = async (req,res)=>
{
  try{

    const user = await userModel.findById(req.userId);
    if (!user) throw new Error("User not found");
    const {addressId} = req.body;

    
    console.log("address at backed",addressId)
    console.log(typeof(addressId))


    user.addresses = user.addresses.filter((add) => add._id.toString() !== addressId);

  

    await user.save();

    res.status(200).json({
      message: "Address Deleted Successfully",
      error: false,
      success: true,
    });

  }
  catch(err)
  {
    res.status(400).json({
      message : err.message || err,
      error:true,
      success:false,

    })
  }

}

module.exports= deleteAddressController;