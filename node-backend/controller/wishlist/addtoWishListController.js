const addtoWishListModel = require("../../models/addtoWishListModel")


const addtoWishListController= async(req,res)=>{
  try{
    const {id , image , category,name,description,originalPrice,discountPercentage}=req?.body

    const curruentUser=req.userId
    console.log("got id in backend",id)

    const isproductavailable= await addtoWishListModel.findOne({id:id, userId: curruentUser})

    if(isproductavailable){
      return res.json({
        message:"Item already exit in your favorite",
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

    const newaddTocart= await addtoWishListModel(payload)
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

module.exports=addtoWishListController;