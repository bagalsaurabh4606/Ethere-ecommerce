import { useDispatch } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { userActions } from "../store/userSlice";
import { toast } from "react-toastify";
import summaryApi from "../comman";
import { useState } from "react";
import AdminLogOutConfirm from "./AdminLogOutConfirm";


const AdminPanel = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();

const [logoutForm , setlogOutForm]=useState(false)
  
  const handleLogout = async () => {
    try {

      const response = await fetch(summaryApi.LogoutUser.url, {
        method: summaryApi.LogoutUser.method,
        credentials: "include",
      });
  
     
  
      const dataApi = await response.json();
  
      if (dataApi.success) {
        toast.error(dataApi.message);
        dispatch(userActions.setUserDetails(null))
        navigate("/")
      } else if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out. Please try again later.");
    }
  };

  return (
    <div className="admin-container">
     

      
      <div className="sidebar">
        <div
          class="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary"
          style={{width: "280px", height:"600px"}}
        >
          <div
            
            class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
          >
            <svg class="bi pe-none me-2" width="40" height="32">
              
            </svg>
            <span class="fs-4">Admin Panel</span>
          </div>
          <hr />
          
          
          <ul class="nav nav-pills flex-column mb-auto">
            <li class="nav-item">
              <Link to="all-users" class="nav-link link-body-emphasis" aria-current="page">
                <svg class="bi pe-none me-2" width="16" height="16">
                  <use xlink:href="#home"></use>
                </svg>
                All Users
                
              </Link>
            </li>
            <hr />
            <li class="nav-item">
              <Link to="all-products" class="nav-link  link-body-emphasis">
                <svg class="bi pe-none me-2" width="16" height="16">
                  <use xlink:href="#people-circle"></use>
                </svg>
                All Products
              </Link>
            </li>
            <hr />
            <li class="nav-item">
              <button className="nav-link link-body-emphasis Admin_Logout" onClick={()=>{setlogOutForm(true)}} >
                <svg class="bi pe-none me-2" width="16" height="16">
                  
                </svg>
                LogOut
              </button>
            </li>
          </ul>
          <hr />
        </div>
      </div>
      <div className="main-section-admin"><Outlet></Outlet></div>
      {logoutForm &&<> <AdminLogOutConfirm handleLogout={handleLogout} setlogOutForm={setlogOutForm}/></>}
    </div>
  );
};

export default AdminPanel;




/*

import { useDispatch } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { userActions } from "../store/userSlice";
import { toast } from "react-toastify";
import summaryApi from "../comman";
import { useState } from "react";


const AdminPanel = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();

const [handleLogOut , sethandleLogOut]=useState(false)
  
  const handleLogout = async () => {
    try {

      const response = await fetch(summaryApi.LogoutUser.url, {
        method: summaryApi.LogoutUser.method,
        credentials: "include",
      });
  
     
  
      const dataApi = await response.json();
  
      if (dataApi.success) {
        toast.error(dataApi.message);
        dispatch(userActions.setUserDetails(null))
        navigate("/")
      } else if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out. Please try again later.");
    }
  };

  return (
    <div className="admin-container">
     

      
      <div className="sidebar">
        <div
          class="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary"
          style={{width: "280px", height:"600px"}}
        >
          <div
            
            class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
          >
            <svg class="bi pe-none me-2" width="40" height="32">
              
            </svg>
            <span class="fs-4">Admin Panel</span>
          </div>
          <hr />
          
          
          <ul class="nav nav-pills flex-column mb-auto">
            <li class="nav-item">
              <Link to="all-users" class="nav-link link-body-emphasis" aria-current="page">
                <svg class="bi pe-none me-2" width="16" height="16">
                  <use xlink:href="#home"></use>
                </svg>
                All Users
                
              </Link>
            </li>
            <hr />
            <li class="nav-item">
              <Link to="all-products" class="nav-link  link-body-emphasis">
                <svg class="bi pe-none me-2" width="16" height="16">
                  <use xlink:href="#people-circle"></use>
                </svg>
                All Products
              </Link>
            </li>
            <hr />
            <li class="nav-item">
              <button className="nav-link link-body-emphasis Admin_Logout" onClick={handleLogout} >
                <svg class="bi pe-none me-2" width="16" height="16">
                  
                </svg>
                LogOut
              </button>
            </li>
          </ul>
          <hr />
        </div>
      </div>
      <div className="main-section-admin"><Outlet></Outlet></div>
    </div>
  );
};

export default AdminPanel;
*/