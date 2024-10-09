
const razorpay = require("../../config/razorpay");
const userModel = require("../../models/userModels");

const paymentController = async (request, response) => {
  try {
    const bagItems = request.body;
    const user = await userModel.findOne({ _id: request.userId });

    let amount = 0;
    bagItems.forEach((item) => {
      const discount = item.discountPercentage || 0;
      const discountedPrice = item.originalPrice * (1 - discount / 100);
      amount += discountedPrice * item.quantity;
    });

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // amount in smallest currency unit (paise)
      currency: "INR",
      receipt: `receipt_order_${new Date().getTime()}`,
      notes: {
        email: user.email,
      },
    });

    response.status(200).json({ orderId: order.id });
  } catch (err) {
    response.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = paymentController;
