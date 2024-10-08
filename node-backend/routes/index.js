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
const addToBagController = require('../controller/addtoBagController')
const getBagProductController = require('../controller/getBagproductController')
const getCartProductController = require('../controller/getCartProductController')
const deleteBagProductController = require('../controller/deleteBagproductController')
const deleteCartProductController = require('../controller/deleteCartproductController')
const searchProductController = require('../controller/searchProductController')
const quantityController = require('../controller/quantityController')
const authorizeAdminController = require('../controller/authorizeAdminController')
const paymentController = require('../controller/order/paymentController')

router.post("/signup",userSignUpController)
router.post("/login",userLoginINController)
router.get("/user-details",authToken,userDetailsController)
router.get("/user-logout",userLogout)

//admin-panel
router.get("http://localhost:5173/admin-panel",authToken,authorizeAdminController)
router.get("/all-users",authToken,allUsers)
router.post("/update-user",authToken,updateUser)
//product
router.post("/upload-prouct",authToken,uploadPoductController)
router.get("/get-product",getproductController)


router.post("/update-product",authToken,upadateProductController)


router.get("/get-catagory",getCatagoryProductController)

router.get("/search",searchProductController)
// router.post("/category-product",getCategoryWiseOneProduct)

//useradd to cart

router.post("/addTocart",authToken,addToCartController)
router.get("/fetchCart-product",authToken,getCartProductController)
router.delete("/deletecartproduct",authToken,deleteCartProductController)

//useradd to bag
router.post("/addToBag",authToken,addToBagController)
router.get("/getBagproduct",authToken,getBagProductController)
router.delete("/deletebagProduct",authToken,deleteBagProductController)
router.post("/bag-quantity",authToken,quantityController)

//payment and order

router.post("/checkout",authToken,paymentController)
module.exports=router