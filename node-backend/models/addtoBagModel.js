const { required, string, number } = require('joi')
const { default: mongoose } = require('mongoose')
const express=require('mongoose')

const addtoBagSchema=new mongoose.Schema({ 

  productId:String,
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

const addtoBagModel = mongoose.model("addToBag",addtoBagSchema)

module.exports=addtoBagModel;