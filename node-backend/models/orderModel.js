// models/orderModel.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  email: { type: String, required: true },
  products: [
    {
      id: Number,
      category: String,
      name: String,
      description: String,
      originalPrice: Number,
      discountPercentage: Number,
      quantity: Number,
      image: [String],
    },
  ],
  totalAmount: { type: Number, required: true },
  orderId: { type: String, required: true },
  paymentStatus: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
