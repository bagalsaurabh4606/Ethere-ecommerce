const express = require('express')
const router=express.Router()

const userSignUpController=require("../controller/userSignUp")
const userLoginINController=require("../controller/userLogin")
const authToken = require('../middleware/authToken')
const userDetailsController = require('../controller/userDetails')
const userLogout = require('../controller/userLogout')
const allUsers = require('../controller/allUsers')
const updateUser = require('../controller/updateUser')
const uploadPoductController = require('../controller/uploadProduct')
const getproductController = require('../controller/getProduct')
const upadateProductController = require('../controller/updateProduct')
const getCatagoryProductController = require('../controller/getCatagoryProduct')
const getCategoryWiseOneProduct = require('../controller/getCategoryWiseOneProduct')
const addToCartController = require('../controller/addtoCartController')
const fetchCartProductController = require('../controller/fetchCartProductController')

router.post("/signup",userSignUpController)
router.post("/login",userLoginINController)
router.get("/user-details",authToken,userDetailsController)
router.get("/user-logout",userLogout)

//admin-panel
router.get("/all-users",authToken,allUsers)
router.post("/update-user",authToken,updateUser)
//product
router.post("/upload-prouct",authToken,uploadPoductController)
router.get("/get-product",getproductController)


router.post("/update-product",authToken,upadateProductController)


router.get("/get-catagory",getCatagoryProductController)
router.post("/category-product",getCategoryWiseOneProduct)

//useradd to cart

router.post("/addTocart",authToken,addToCartController)
router.get("/fetchCart-product",authToken,fetchCartProductController)


module.exports=router