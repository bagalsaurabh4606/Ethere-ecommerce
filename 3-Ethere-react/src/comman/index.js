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
  UpdateUser:{
    url:`${backendDomain}/api/update-user`,
    method:`post`
  },
  AdminAuthentication:{
url:`${backendDomain}/api/admin-panel`,
method:`get`
  },
  uploadProduct:{
    url:`${backendDomain}/api/upload-prouct`,
    method:`post`
  },
  getProduct:{
    url:`${backendDomain}/api/get-product`,
    method:`get`
  },
  updateProduct:{
    url:`${backendDomain}/api/update-product`,
    method:`post`
  },
  categoryProduct:{
    url:`${backendDomain}/api/get-catagory`,
    method:`get`
  },
  // categoryWiseProductOne:{
  //   url:`${backendDomain}/api/category-product`,
  //   method:`post`
  // },
  addTocart:{
    url:`${backendDomain}/api/addTocart`,
    method:`post`
  },
  getCartProduct:{
    url:`${backendDomain}/api/fetchCart-product`,
    method:`get`
  },

  addToBag:{
    url:`${backendDomain}/api/addToBag`,
    method:`post`
  },
  getBagproducts:{
    url:`${backendDomain}/api/getBagproduct`,
    method:`get`
  },
  deleteBagProduct:{
    url:`${backendDomain}/api/deletebagProduct`,
    method:`delete`
  },
  deleteCartProduct:{
    url:`${backendDomain}/api/deletecartproduct`,
    method:`delete`
  },
  bagQuantity:{
    url:`${backendDomain}/api/bag-quantity`,
    method:`post`
  },

  searchProduct:{
    url:`${backendDomain}/api/search`,
    method:`get`
  },

  
};

export default summaryApi;
