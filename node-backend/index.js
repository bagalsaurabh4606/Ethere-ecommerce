const express = require('express');
const cors=require('cors');
const cookieParser=require('cookie-parser')
require('dotenv').config();
const connectDB=require('./config/db');
const router=require('./routes');
const webhookController = require('./controller/order/webHook'); 


const app=express()

app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf.toString(); // Stores raw body as a string on the request object
  }
}));
app.use(cors(
{  origin:process.env.FRONTEND_URL,
 credentials:true
}
))
app.use(express.json())
app.use(cookieParser())
app.use("/api",router)


app.post('/webhook', webhookController);

app.get("/",(req,res)=>
{
   res.send("Welcome to Backend")
})



const PORT= 2024 || process.env.PORT 
connectDB().then(()=>{
  app.listen(PORT,()=>{
    console.log("connect to DB")
    console.log("server is running ",PORT) 
  })
})


