const addtocartModel = require("../models/addtoCardModel")

const addToCartController= async(req,res)=>{
  try{
    const {productId , image , category,name,description,originalPrice,discountPercentage}=req?.body

    const curruentUser=req.userId

    const isproductavailable= await addtocartModel.findOne({productId:productId, userId: curruentUser})

    if(isproductavailable){
      return res.json({
        message:"Item already exit in your favorite",
        success:true,
        error:false,
      })
    }
    const payload={
      productId:productId,
      userId:curruentUser,
      quantity:1,
      image:image,
      category:category,
      name:name,
      description:description,
      originalPrice:originalPrice,
      discountPercentage:discountPercentage
    }

    const newaddTocart= await addtocartModel(payload)
    const saveproduct=await newaddTocart.save()

   return res.json({
      data:saveproduct,
      message:"Item added to Favorite",
      error:true,
      success:false,
    })

  }catch(err){
    res.status(400).json({
      message:err.message || err,
      error:true,
      success:false
    })
  }
}

module.exports=addToCartController;