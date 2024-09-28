const productModel = require("../models/productModel");

const searchProductController =async(req,res)=>
{
  try{
         const query=req.query.q;
         
         console.log("checlkig querry",query)
         const regex = new RegExp(query,'i','g')


         const product = await productModel.find({
            "$or" : [
              {
                name:regex
              },
              {
                category:regex 
              }
            ]
         })

         //console.log(product)

         res.json({
          data:product,
          message:"search product list ",
          error:false,
          success:true,
         })


  }
  catch(err)
  {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}


module.exports=searchProductController;