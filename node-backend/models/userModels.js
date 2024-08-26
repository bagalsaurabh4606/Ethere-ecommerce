const { required, string } = require('joi')
const { default: mongoose } = require('mongoose')
const express=require('mongoose')

const userSchema=new mongoose.Schema({ 
  name:String,
  email:{
    type:String,
    unique:true,
    required:true
  },
  password:String,
  role:String
},
{timestamps:true,}
)

const userModel = mongoose.model("users",userSchema)

module.exports=userModel