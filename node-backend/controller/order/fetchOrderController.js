const orderModel = require("../../models/orderModel");

const fetchOrderController=async(req,res)=>{
  try{
    const userId=req.userId;
    const order=await orderModel.find({userId:userId});
    console.log("orderrrrrrr",order)
res.status(200).json({
  data:order,
  error: false,
  success: true,
  message:"order details fetched"
  
})
    console.log("orderrrr",order)
  } catch (err) {
    response.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports=fetchOrderController;