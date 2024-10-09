import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import FetchItems from "../components/FetchItems";
import LoadingSpinner from "../components/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import summaryApi from "../comman";
import { useEffect, useState } from "react";
import Context from "../context";
import { userActions } from "../store/userSlice";
import ProfileSidebar from "../components/ProfileSidebar";
import { categoryAction } from "../store/categorySlice";
import { bagActions } from "../store/bagSlice";
import { wishlistActions } from "../store/wishlistSlice";

function App() {
  const fetchStatus = useSelector((store) => store.fetchStatus);
  const dispatch = useDispatch();
  const bag = useSelector((state) => state.bag);
  const currentUser = useSelector((store) => store.user.data);
  const isUserLoggedIn = currentUser && Object.keys(currentUser).length > 0;


    const fetchUserDetails = async () => {
      const dataresponse = await fetch(summaryApi.currentUser.url, {
        method: summaryApi.currentUser.method,
        credentials: "include",
      });
      const dataApi = await dataresponse.json();

      console.log("got user deatils in app.jsxx", dataApi.data);

      if (dataApi.success) {
        dispatch(userActions.setUserDetails(dataApi));
      }
    };
    // if (currentUser && Object.keys(currentUser).length > 0) {
    //   fetchUserDetails(); // Fetch bag products if user is logged in
    // } else {
    //   dispatch(userActions.setUserDetails([]));
    // }

    useEffect(() => {
      if (!currentUser || Object.keys(currentUser).length === 0) {
        fetchUserDetails(); 
      }
    }, []); 
    


  

  //bag product fetching

  useEffect(() => {
    const fetchBagProduct = async () => {
      const response = await fetch(summaryApi.getBagproducts.url, {
        method: summaryApi.getBagproducts.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
      const responseData = await response.json();
      if (responseData.success) {
        dispatch(bagActions.addToBag(responseData?.data));
      }
    };

    if (currentUser && Object.keys(currentUser).length > 0) {
      fetchBagProduct(); // Fetch bag products if user is logged in
    } else {
      dispatch(bagActions.addToBag([]));
    }
  }, [currentUser]);

  //wishlist product fetching
  useEffect(() => {
    const fetchcartproduct = async () => {
      const response = await fetch(summaryApi.getCartProduct.url, {
        method: summaryApi.getCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
      const responseData = await response.json();
      if (responseData.success) {
        dispatch(wishlistActions.addToWishlist(responseData.data));
      } else {
        dispatch(wishlistActions.addToWishlist([]));
      }
    };

    if (currentUser && Object.keys(currentUser).length > 0) {
      fetchcartproduct(); // Fetch wishlist products if user is logged in
    } else {
      dispatch(wishlistActions.addToWishlist([])); // Clear wishlist if user is logged out
    }
  }, [currentUser, dispatch]);



  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails, //user detail fetched
        }}
      >
        <ToastContainer />
        <Header />
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
