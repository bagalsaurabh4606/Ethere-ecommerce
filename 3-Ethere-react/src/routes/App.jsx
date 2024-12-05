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
import { bagActions } from "../store/bagSlice";
import { wishlistActions } from "../store/wishlistSlice";
import Home from "./Home";

function App() {
  const fetchStatus = useSelector((store) => store.fetchStatus);
  const dispatch = useDispatch();

  const currentUser = useSelector((store) => store.user.data);
  const isUserLoggedIn = currentUser && Object.keys(currentUser).length > 0;

  // Fetch user details if not already logged in
  const fetchUserDetails = async () => {
    const dataresponse = await fetch(summaryApi.currentUser.url, {
      method: summaryApi.currentUser.method,
      credentials: "include",
    });
    const dataApi = await dataresponse.json();

    if (dataApi.success) {
      dispatch(userActions.setUserDetails(dataApi));
    }
  };

  useEffect(() => {
    if (!currentUser || Object.keys(currentUser).length === 0) {
      fetchUserDetails();
    }
  }, [currentUser, dispatch]);

  // Fetch bag products if user is logged in
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
        dispatch(bagActions.addToBag(responseData.data));
      }
    };

    if (isUserLoggedIn) {
      fetchBagProduct();
    } else {
      dispatch(bagActions.addToBag([]));
    }
  }, [isUserLoggedIn, dispatch]);

  // Fetch wishlist products if user is logged in
  useEffect(() => {
    const fetchWishlistProduct = async () => {
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

    if (isUserLoggedIn) {
      fetchWishlistProduct();
    } else {
      dispatch(wishlistActions.addToWishlist([]));
    }
  }, [isUserLoggedIn, dispatch]);

  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails, // Provides user details fetch functionality
        }}
      >
        <ToastContainer />
        <Header />
             
        <FetchItems />
        {fetchStatus.currentFetching ? <LoadingSpinner /> : <Outlet />}
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
