// const razorpay = require("../../config/razorpay");
// const orderModel = require("../../models/orderModel");
// const crypto = require("crypto");


// const webhookController = async (req, res) => {
//   const secret = process.env.WEBHOOK_SECRET;
//   const signature = req.headers["x-razorpay-signature"];

//   if (!signature) {
//     return res.status(400).send("Signature missing");
//   }

//   const body = JSON.stringify(req.body);
//   const hmac = crypto.createHmac("sha256", secret);
//   hmac.update(body, "utf-8");
//   const generatedSignature = hmac.digest("hex");

//   if (generatedSignature !== signature) {
//     return res.status(403).send("Invalid signature");
//   }

//   try {
//     const { event, payload } = req.body;

//     if (event === "order.paid") {
//       const paymentDetails = payload.payment.entity;
//       const orderDetails = payload.order.entity;

//       const orderId = orderDetails.id;
//       const paymentId = paymentDetails.id;

//       await orderModel.updateOne(
//         { orderId: orderId },
//         {
//           $set: {
//             paymentId: paymentId,
//             paymentStatus: "Paid",
//             updatedAt: new Date(),
//           },
//         }
//       );

//       res.status(200).send("Order updated to paid successfully");
//     } else {
//       res.status(200).send("Event ignored");
//     }
//   } catch (err) {
//     console.error("Error processing webhook:", err);
//     res.status(500).send("Server error");
//   }
// };

// module.exports = webhookController;



const razorpay = require("../../config/razorpay");
const orderModel = require("../../models/orderModel");
const addtoBagModel = require("../../models/addtoBagModel");
const crypto = require("crypto");

const webhookController = async (req, res) => {
  const secret = process.env.WEBHOOK_SECRET;
  console.log("secrete key",secret)
  const signature = req.headers["x-razorpay-signature"];

  console.log("signature from razor pay",signature)
  if (!signature) {
    return res.status(400).send("Signature missing");
  }

  const body = JSON.stringify(req.body);
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(body, "utf-8");
  const generatedSignature = hmac.digest("hex");

  if (generatedSignature !== signature) {
    return res.status(403).send("Invalid signature");
  }

  try {
    const { event, payload } = req.body;

    if (event === "order.paid") {
      const paymentDetails = payload.payment.entity;
      const orderDetails = payload.order.entity;

      const orderId = orderDetails.id;
      const paymentId = paymentDetails.id;
      const paymentStatus=orderDetails.status;

      const order = await orderModel.findOneAndUpdate(
        { orderId: orderId },
        {
          $set: {
            paymentId: paymentId,
            paymentStatus:paymentStatus,
            updatedAt: new Date(),
          },
        },
        { new: true }
      );

      if (!order) {
        return res.status(404).send("Order not found");
      }

      const userId = order.userId.toString();
      const productIds = order.products.map(product => product.id);

      const result = await addtoBagModel.deleteMany({
        userId: userId,
        id: { $in: productIds }
      });

      console.log(`${result.deletedCount} items removed from addtoBag`);
      res.status(200).send("Order updated to paid successfully, and items removed from addtoBag");
    } else {
      res.status(200).send("Event ignored");
    }
  } catch (err) {
    console.error("Error processing webhook:", err);
    res.status(500).send("Server error");
  }
};

module.exports = webhookController;
