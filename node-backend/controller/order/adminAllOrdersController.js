const orderModel = require("../../models/orderModel");

const adminAllOrdersController=async(req,res)=>{
  try{

    const userId=req.userId;

    const orders=orderModel.find()
    res.json({
      message:"All orders Fetched",
      success:true,
      error:false,
      data:orders,
    
     })

    console.log("data",orders)

  }catch (err) {
    response.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports=adminAllOrdersController;