const productModel = require("../models/productModel");

async function getCatagoryProductController(req, res) {
  try {
    const product = await productModel.distinct("category");

    //array to store product from each catagory

    const productCatagory=[]

    for(const category of product){
      const products=await productModel.findOne({category})

      if(products){
        productCatagory.push(products);
      }
    }

    res.json({
      message:"catagory product",
      data:productCatagory,
      success:true,
      error:false
    })

  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = getCatagoryProductController;
