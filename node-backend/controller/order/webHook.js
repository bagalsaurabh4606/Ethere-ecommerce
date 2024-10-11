const razorpay = require("../../config/razorpay");
const orderModel = require("../../models/orderModel");
const crypto = require("crypto");

const webhookController = async (req, res) => {
  const secret = process.env.WEBHOOK_SECRET;
  const signature = req.headers["x-razorpay-signature"];

  if (!signature) {
    return res.status(400).send("Signature missing");
  }

  // Convert the request body to a string format
  const body = JSON.stringify(req.body);

  // Verify the signature
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(body, "utf-8");
  const generatedSignature = hmac.digest("hex");
  console.log(req.body);
  console.log(signature)

  console.log("generatedSignature",generatedSignature)
  if (generatedSignature !== signature) {
    console.log("Invalid signature")
    return res.status(403).send("Invalid signature");
  }

  try {
    
    const { event, payload } = req.body;

    // Handle only the 'order.paid' event
    if (event === "order.paid") {
      const paymentDetails = payload.payment.entity;
      const orderDetails = payload.order.entity;

      const orderId = orderDetails.id;
      const paymentId = paymentDetails.id;
      const paymentStatus = paymentDetails.status;

      console.log("oder Id ",orderId)
      console.log("paymentId Id ",paymentId)
      console.log("paymentStatus Id ",paymentStatus)

      // Update the database to mark the order as paid
      await orderModel.updateOne(
        { orderId: orderId },
        {
          $set: {
            paymentId: paymentId,
            paymentStatus: "Paid",
            updatedAt: new Date(),
          },
        }
      );

      res.status(200).send("Order updated to paid successfully");
    } else {
      res.status(200).send("Event ignored");
    }
  } catch (err) {
    console.error("Error processing webhook:", err);
    res.status(500).send("Server error");
  }
};

module.exports = webhookController;
