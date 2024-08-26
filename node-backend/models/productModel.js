const { required, string, number } = require('joi')
const { default: mongoose } = require('mongoose')
const express=require('mongoose')

const productSchema=new mongoose.Schema({ 
  id: Number,
  category: String,
  name:String,
  description: String,
  originalPrice: Number,
  discountPercentage: Number,
  image: [],

},
{timestamps:true,}
)

const productModel = mongoose.model("product",productSchema)

module.exports=productModel