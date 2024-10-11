const express = require('express');
const cors=require('cors');
const cookieParser=require('cookie-parser')
require('dotenv').config();
const connectDB=require('./config/db');
const router=require('./routes');
const webhookController = require('./controller/order/webHook');
const authToken = require('./middleware/authToken');

const app=express()
app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf.toString(); // Store raw body as a string on the request object
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

app.get("/", (req, res) => {
  res.send("Welcome to the backend!");
});

app.post('/webhook',authToken, webhookController);



const PORT= 2024 || process.env.PORT 
connectDB().then(()=>{
  app.listen(PORT,()=>{
    console.log("connect to DB")
    console.log("server is running ",PORT) 
  })
})


// const express = require('express');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// require('dotenv').config();
// const connectDB = require('./config/db');
// const router = require('./routes');
// const webhookController = require('./controller/order/webHook');

// const app = express();

// // Middleware to capture the raw body for signature verification
// app.use(express.json({
//   verify: (req, res, buf) => {
//     req.rawBody = buf.toString(); // Store raw body as a string on the request object
//   }
// }));

// app.use(cors({
//   origin: process.env.FRONTEND_URL,
//   credentials: true
// }));

// app.use(cookieParser());
// app.use("/api", router);

// app.get("/", (req, res) => {
//   res.send("Welcome to the backend!");
// });

// // Define the webhook route
// app.post('/webhook', webhookController);

// const PORT = process.env.PORT || 2024;
// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log("Connected to DB");
//     console.log("Server is running on port", PORT);
//   });
// });
