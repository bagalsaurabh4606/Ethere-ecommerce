const orderModel = require("../../models/orderModel");

const orderStatusController=async(req,res)=>{
  const {orderId} =req.params;
  const { orderPacked } = req.body;
  console.log("comming from front end",orderId,orderPacked)

  try {
    const order = await orderModel.findByIdAndUpdate(orderId, { orderPacked }, { new: true });
    res.status(200).json(order);

    console.log("orderrrrrr statusssss",order)
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports=orderStatusController;