const addtoBagModel = require("../../models/addtoBagModel");

const quantityController=async (req,res)=>{
try{
  const userid=req.userId;
  const productId=req.body.productId;
  const qty = req.body.quantity;

  const updatedproduct=await addtoBagModel.updateOne({id:productId ,userId:userid},{

    ...(qty && {quantity : qty})
  })

  res.json({
    message:"Product quantity increased",
    data:updatedproduct,
    error:false,
    success:true,
  })

}catch(err){
  res.status(400).json({
    message:err.message || err,
    error:false,
    success:true
  })
}
}

module.exports =quantityController;

// const addtoBagModel = require("../models/addtoBagModel");

// const quantityController = async (req, res) => {
//   try {
//     const userid = req.userId; // Assuming this is set correctly
//     const { productId } = req.body; // Ensure this is being passed correctly
//     const qty = req.body.quantity;

//     console.log("userid", userid);
//     console.log("product id", productId);
//     console.log("quantity coming from front end", qty);

//     // Use findByIdAndUpdate
//     const updatedProduct = await addtoBagModel.findByIdAndUpdate(
//       productId, // This should be the ID of the product you want to update
//       { $set: { quantity: qty } }, // Update quantity
//       { new: true } // This option returns the updated document
//     );

//     if (!updatedProduct) {
//       return res.status(404).json({
//         message: "Product not found",
//         error: true,
//         success: false,
//       });
//     }

//     res.json({
//       message: "Product quantity updated successfully",
//       data: updatedProduct,
//       error: false,
//       success: true,
//     });
//   } catch (err) {
//     res.status(400).json({
//       message: err.message || err,
//       error: true,
//       success: false,
//     });
//   }
// };

// module.exports = quantityController;
