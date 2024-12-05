const userModel = require("../../models/userModels");

const updateProfielController = async (req,res)=>
{
  try{

    const userId = req.userId; 
    console.log(userId,"userId in update");
    const { title, address } = req.body;

    
    if (!title || !address) {
      return res.status(400).json({ success: false, message: "Both title and address are required." });
    }

    if (address.length < 5) {
      return res.status(400).json({ success: false, message: "Please Enter Detailed Address" });
    }

   
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    
    user.addresses.push({ title, address });
    await user.save();

    res.status(200).json({
      success: true,
      message: "Address added successfully.",
      data: user,
    });


  }
  catch(err)
  {
    res.status(400).json({
      message:err.message||err,
      success:false,
      error: true,
    })
  }
}

module.exports=updateProfielController;