import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { userActions } from "../store/userSlice";
import { toast } from "react-toastify";
import summaryApi from "../comman";
import { useState } from "react";
import AdminLogOutConfirm from "./AdminLogOutConfirm";
import { bagActions } from "../store/bagSlice";
import styles from "../styles/AdminPanel.module.css"; // Importing CSS module

const AdminPanel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bagItems = useSelector((store) => store.bag.bagProducts);
  const [logoutForm, setLogOutForm] = useState(false);

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

  return (
    <div className={styles.adminContainer}>
      <div className={styles.sidebar}>
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{ width: "280px", height: "600px" }}>
          <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
            <svg className="bi pe-none me-2" width="40" height="32"></svg>
            <span className="fs-4">Admin Panel</span>
          </div>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <Link to="all-users" className="nav-link link-body-emphasis" aria-current="page">
                <svg className="bi pe-none me-2" width="16" height="16">
                  <use to="#home"></use>
                </svg>
                All Users
              </Link>
            </li>
            <hr />
            <li className="nav-item">
              <Link to="all-products" className="nav-link link-body-emphasis">
                <svg className="bi pe-none me-2" width="16" height="16">
                  <use to="#people-circle"></use>
                </svg>
                All Products
              </Link>
            </li>
            <hr />
            <li className="nav-item">
              <button className="nav-link link-body-emphasis Admin_Logout" onClick={() => setLogOutForm(true)}>
                <svg className="bi pe-none me-2" width="16" height="16"></svg>
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
      {logoutForm && (
        <AdminLogOutConfirm handleLogout={handleLogout} setLogOutForm={setLogOutForm} />
      )}
    </div>
  );
};

export default AdminPanel;
