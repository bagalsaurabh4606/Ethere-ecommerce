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
  categoryWiseProductOne:{
    url:`${backendDomain}/api/category-product`,
    method:`post`
  },
  addTocart:{
    url:`${backendDomain}/api/addTocart`,
    method:`post`
  },
  getCartProduct:{
    url:`${backendDomain}/api/fetchCart-product`,
    method:`get`
  }
  
};

export default summaryApi;
