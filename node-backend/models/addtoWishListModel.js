const { required, string, number } = require('joi')
const { default: mongoose } = require('mongoose')
const express=require('mongoose')

const addtoWishListSchema=new mongoose.Schema({ 

  id:Number,
  userId:String,
  quantity:String,
  image:[],
  category:String,
  name:String,
  description:String,
  originalPrice:Number,
  discountPercentage:Number,

},
{timestamps:true,}
)

const addtoWishListModel = mongoose.model("addtocart",addtoWishListSchema)

module.exports=addtoWishListModel;