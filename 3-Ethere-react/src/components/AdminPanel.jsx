import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { userActions } from "../store/userSlice";
import { toast } from "react-toastify";
import summaryApi from "../comman";
import { useState } from "react";
import AdminLogOutConfirm from "./AdminLogOutConfirm";
import styles from "../styles/AdminPanel.module.css"; // Importing CSS module

const AdminPanel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutForm, setLogOutForm] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch(summaryApi.LogoutUser.url, {
        method: summaryApi.LogoutUser.method,
        credentials: "include",
      });

      const dataApi = await response.json();

      if (dataApi.success) {
        toast.error(dataApi.message);
        navigate("/");
        dispatch(userActions.setUserDetails([]));
      } else if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out. Please try again later.");
    }
  };

  const handleLogoutResponsive =()=>
  {
     
    setMenuOpen(false);
    setLogOutForm(true);
    
  }

  return (
    <div className={styles.adminContainer}>
      {/* Three-Line Icon for Mobile */}
      <div className={styles.threeLineMenuIcon} onClick={() => setMenuOpen(true)}>
        &#9776; {/* Unicode for three-line icon */}
      </div>

      <div className={styles.sidebar}>
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{ width: "280px", height: "600px" }}>
          <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
            <span className="fs-4">Admin Panel</span>
          </div>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <Link to="all-users" className="nav-link link-body-emphasis" aria-current="page">
                All Users
              </Link>
            </li>
            <hr />
            <li className="nav-item">
              <Link to="all-products" className="nav-link link-body-emphasis">
                All Products
              </Link>
            </li>
            <hr />
            <li className="nav-item">
              <Link to="all-orders" className="nav-link link-body-emphasis">
                All Orders
              </Link>
            </li>
            <hr />
            <li className="nav-item">
              <button className="nav-link link-body-emphasis Admin_Logout" onClick={() => setLogOutForm(true)}>
                LogOut
              </button>
            </li>
            
          </ul>
          <hr />
        </div>
      </div>

      <div className={styles.mainSectionAdmin}>
        <Outlet />
      </div>

      {/* Overlay Menu */}
      <div className={`${styles.overlayMenu} ${menuOpen ? styles.open : ""}`}>
        <span className={styles.overlayMenuCloseBtn} onClick={() => setMenuOpen(false)}>
          &times; {/* Unicode for cross icon */}
        </span>
        <div className={styles.menuItems}>
          <Link to="all-users" className={styles.menuItemLink} onClick={()=>setMenuOpen(false)}>
            All Users
          </Link>
          <Link to="all-products" className={styles.menuItemLink} onClick={()=>setMenuOpen(false)}>
             All Products
          </Link>
          <Link to="all-orders" className={styles.menuItemLink} onClick={()=>setMenuOpen(false)}>
             All Orders
          </Link>
          <button className={styles.menuItemLink} onClick={handleLogoutResponsive}>
            LogOut
          </button>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {logoutForm && (
        <AdminLogOutConfirm handleLogout={handleLogout} setLogOutForm={setLogOutForm} />
      )}
    </div>
  );
};

export default AdminPanel;
