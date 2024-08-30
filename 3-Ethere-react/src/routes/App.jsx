import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import FetchItems from "../components/FetchItems";
import LoadingSpinner from "../components/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import summaryApi from "../comman";
import { useEffect } from "react";
import Context from "../context";
import { userActions } from "../store/userSlice";
import ProfileSidebar from "../components/ProfileSidebar";
import { categoryAction } from "../store/categorySlice";
import { bagActions } from "../store/bagSlice";


function App() {
  const fetchStatus = useSelector((store) => store.fetchStatus);
 const dispatch=useDispatch();
  const fetchUserDetails = async () => {
    const dataresponse = await fetch(summaryApi.currentUser.url, {
      method: summaryApi.currentUser.method,
      credentials: "include",
    });

    const dataApi = await dataresponse.json()
  

    // dispatch(userActions.setUserDetails(dataApi))
  
    if(dataApi.success){
      dispatch(userActions.setUserDetails(dataApi))
    }
  };

  //bag product fetching
  const fetchbagproduct=async()=>{
    const response=await fetch(summaryApi.getBagproducts.url,{
      method:summaryApi.getBagproducts.method,
      credentials:'include',
      headers:{
        "content-type":"application/json"
      },

    })
    const responseData=await response.json()
    if(responseData.success){
      dispatch(bagActions.addToBag(responseData?.data));
    }

  }
  //wishlist product fetching
  const fetchcartproduct=async()=>{
    const response=await fetch(summaryApi.getCartProduct.url,{
      method:summaryApi.getCartProduct.method,
      credentials:'include',
      headers:{
        "content-type":"application/json"
      },

    })
    const responseData=await response.json()

    if(responseData.success){
      dispatch(wishlistActions.addToWishlist(responseData?.data));
    }

  }
  useEffect(()=>{
    fetchcartproduct();
  },[])


  useEffect(()=>{
    fetchcartproduct();
  },[])



  useEffect(() => {
    fetchUserDetails();
  }, []);

  useEffect(() => {
    fetchbagproduct();
  }, []);



  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails, //user detail fetched
        }}
      >
       
        <ToastContainer />
        <Header fetchbagproduct={fetchbagproduct} fetchcartproduct={fetchcartproduct}/>
        <FetchItems></FetchItems>
        {fetchStatus.currentFetching ? (
          <LoadingSpinner></LoadingSpinner>
        ) : (
          <Outlet></Outlet>
        )}

        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
