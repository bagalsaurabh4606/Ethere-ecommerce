const addtoBagModel = require("../models/addtoBagModel");

const deleteBagProductController = async (req, res) => {
  try {
    const currentuser = req.userId; 
    const id = String(req.body.id);

    

    const product = await addtoBagModel.findOneAndDelete({
      id: id,
      userId: currentuser

    }); 
    if (product) {
      res.status(200).json({
        data:product,
        message: "Product removed from Store",
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
