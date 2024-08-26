const { required, string, number } = require('joi')
const { default: mongoose } = require('mongoose')
const express=require('mongoose')

const addtocartSchema=new mongoose.Schema({ 

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

const addtocarModel = mongoose.model("addtocart",addtocartSchema)

module.exports=addtocarModel;