const addtoBagModel = require("../models/addtoBagModel");

const deleteBagProductController = async (req, res) => {
  try {
    const currentuser = req.userId; 
    const productId = String(req.body.productId);

    const product = await addtoBagModel.findOneAndDelete({
      productId: productId,
      userId: currentuser

    }); 
    if (product) {
      res.status(200).json({
        message: "Product removed from bag",
        error: false,
        success: true,
      });
    } 
    
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = deleteBagProductController;
