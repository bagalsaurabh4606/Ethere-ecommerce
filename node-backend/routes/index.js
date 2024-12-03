const express = require("express");
const router = express.Router();

const userSignUpController = require("../controller/user/userSignUp");
const userLoginINController = require("../controller/user/userLogin");
const authToken = require("../middleware/authToken");
const userDetailsController = require("../controller/user/userDetails");
const userLogout = require("../controller/user/userLogout");
const allUsers = require("../controller/user/allUsers");
const updateUser = require("../controller/user/updateUser");
const uploadPoductController = require("../controller/product/uploadProduct");
const getproductController = require("../controller/product/getProduct");
const upadateProductController = require("../controller/product/updateProduct");
const getCatagoryProductController = require("../controller/product/getCatagoryProduct");
const addtoWishListController = require("../controller/wishlist/addtoWishListController");
const getBagProductController = require("../controller/bag/getBagproductController");
const deleteBagProductController = require("../controller/bag/deleteBagproductController");
const searchProductController = require("../controller/product/searchProductController");
const quantityController = require("../controller/bag/quantityController");
const paymentController = require("../controller/order/paymentController");
const fetchOrderController = require("../controller/order/fetchOrderController");
const adminAllOrdersController = require("../controller/order/adminAllOrdersController");
const orderStatusController = require("../controller/order/OrderStatusController");
const forgotPasswordController = require("../controller/user/forgotPasswordController");
const otpVerificationController = require("../controller/user/otpVerificationController");
const resetPasswordController = require("../controller/user/resetPasswordController");
const authMiddleware = require("../middleware/authMiddleWare");
const deleteAdminProductController = require("../controller/admin/deleteAdminProductController");
const addToBagController = require("../controller/bag/addtoBagController");
const deleteWishListProductController = require("../controller/wishlist/deleteWishListProductController");
const getWishListProductController = require("../controller/wishlist/getWishListProductController");

//Signup and login
router.post("/signup", userSignUpController);
router.post("/login", userLoginINController);
router.get("/user-details", authToken, userDetailsController);
router.get("/user-logout", userLogout);

//admin-panel users

router.get("/all-users", authToken, authMiddleware, allUsers);
router.post("/update-user", authToken, authMiddleware, updateUser);

//admin-panel product
router.post(
  "/upload-prouct",
  authToken,
  authMiddleware,
  uploadPoductController
);
router.delete(
  "/delete-adminproduct",
  authMiddleware,
  deleteAdminProductController
);
router.get("/get-product", getproductController);

router.post(
  "/update-product",
  authToken,
  authMiddleware,
  upadateProductController
);

//Products
router.get("/get-product", getproductController);
router.get("/get-catagory", getCatagoryProductController);
router.get("/search", searchProductController);

//Wishlist
router.post("/addTocart", authToken, addtoWishListController);
router.get("/fetchCart-product", authToken, getWishListProductController);
router.delete("/deletecartproduct", authToken, deleteWishListProductController);

//Bag
router.post("/addToBag", authToken, addToBagController);
router.get("/getBagproduct", authToken, getBagProductController);
router.delete("/deletebagProduct", authToken, deleteBagProductController);
router.post("/bag-quantity", authToken, quantityController);

//payment and order
router.post("/checkout", authToken, paymentController);

//Order
router.get("/order-details", authToken, fetchOrderController);
router.get("/all-orders", authToken, authMiddleware, adminAllOrdersController);
router.post("/order-status/:orderId", authToken, orderStatusController);

//forgot password
router.post("/forgot-password", forgotPasswordController);
router.post("/otp-verification", otpVerificationController);
router.post("/reset-password", resetPasswordController);

module.exports = router;
