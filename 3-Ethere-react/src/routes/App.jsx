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
import addTobag from "../helper/addTobag";
import addTocart from "../helper/addTocart";


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

  useEffect(() => {
    fetchUserDetails();
  }, []);

  addTobag();
  addTocart();

  
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
