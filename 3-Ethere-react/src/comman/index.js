const backendDomain = "http://localhost:2024";

const summaryApi = {
  SignUP: {
    url: `${backendDomain}/api/signup`,
    method: `post`,
  },
  LogIN: {
    url: `${backendDomain}/api/login`,
    method: `post`,
  },
  currentUser: {
    url: `${backendDomain}/api/user-details`,
    method: `get`,
  },
  LogoutUser: {
    url: `${backendDomain}/api/user-logout`,
    method: `get`,
  },
  AllUsers: {
    url: `${backendDomain}/api/all-users`,
    method: `get`,
  },
  UpdateUser: {
    url: `${backendDomain}/api/update-user`,
    method: `post`,
  },
  AdminAuthentication: {
    url: `${backendDomain}/api/admin-panel`,
    method: `get`,
  },
  uploadProduct: {
    url: `${backendDomain}/api/upload-prouct`,
    method: `post`,
  },
  deleteProduct:{
    url:`${backendDomain}/api/delete-adminproduct`,
    method:`delete`
  },
  getProduct: {
    url: `${backendDomain}/api/get-product`,
    method: `get`,
  },
  updateProduct: {
    url: `${backendDomain}/api/update-product`,
    method: `post`,
  },
  categoryProduct: {
    url: `${backendDomain}/api/get-catagory`,
    method: `get`,
  },

  addTocart: {
    url: `${backendDomain}/api/addTocart`,
    method: `post`,
  },
  getCartProduct: {
    url: `${backendDomain}/api/fetchCart-product`,
    method: `get`,
  },

  addToBag: {
    url: `${backendDomain}/api/addToBag`,
    method: `post`,
  },
  getBagproducts: {
    url: `${backendDomain}/api/getBagproduct`,
    method: `get`,
  },
  deleteBagProduct: {
    url: `${backendDomain}/api/deletebagProduct`,
    method: `delete`,
  },
  deleteCartProduct: {
    url: `${backendDomain}/api/deletecartproduct`,
    method: `delete`,
  },
  bagQuantity: {
    url: `${backendDomain}/api/bag-quantity`,
    method: `post`,
  },

  searchProduct: {
    url: `${backendDomain}/api/search`,
    method: `get`,
  },

  payment: {
    url: `${backendDomain}/api/checkout`,
    method: `post`,
  },
  getOrder: {
    url: `${backendDomain}/api/order-details`,
    method: `get`,
  },
  adminAllOrders:{
    url:`${backendDomain}/api/all-orders`,
    method:`get`
  },

  OrderStatus:{
    url:`${backendDomain}/api/order-status`,
    method:`post`
  },
  forgotPassword:{
    url:`${backendDomain}/api/forgot-password`,
    method:`post`
  },
  otpVerification:{
    url:`${backendDomain}/api/otp-verification`,
    method:`post`
  },

  ResetPassword:{
    url:`${backendDomain}/api/reset-password`,
    method:`post`
  },
  
  UpdateProfile:
  {
    url:`${backendDomain}/api/save-address`,
    method:`put`
  },
 
  DeleteAddress:
  {
    url:`${backendDomain}/api/delete-address`,
    method:`delete`
  },

  EditAddress:
  {
    url:`${backendDomain}/api/edit-address`,
    method:`post`
  },
  
  
  

};

export default summaryApi;
