const addtoBagModel = require("../models/addtoBagModel")
const addtocartModel = require("../models/addtoCardModel")

const addToBagController= async(req,res)=>{
  try{
    const {id, image , category,name,description,originalPrice,discountPercentage}=req?.body

    const curruentUser=req.userId
console.log("madarchod",id)
    const isproductavailable= await addtoBagModel.findOne({id:id, userId: curruentUser})

    if(isproductavailable){
      return res.json({
        message:"Item already exit in your Bag",
        success:true,
        error:false,
      })
    }
    const payload={
      
      id:id,
      userId:curruentUser,
      quantity:1,
      image:image,
      category:category,
      name:name,
      description:description,
      originalPrice:originalPrice,
      discountPercentage:discountPercentage
    }

    const newaddTocart= await addtoBagModel(payload)
    const saveproduct=await newaddTocart.save()

   return res.json({
      data:saveproduct,
      message:"Item added to Store",
      error:false,
      success:true,
    })

  }catch(err){
    res.status(400).json({
      message:err.message || err,
      error:true,
      success:false
    })
  }
}

module.exports=addToBagController;