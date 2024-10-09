import { useDispatch, useSelector } from "react-redux";
import summaryApi from "../comman";
import { toast } from "react-toastify";
import { userActions } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useState } from "react";
import AdminLogOutConfirm from "./AdminLogOutConfirm";

const ProfileSidebar = () => {
  const user = useSelector((store) => store?.user?.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutConfirm, setlogOutForm] = useState(false);

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

  // Check if user is undefined or null before rendering user details
  if (!user) {
    return <p>Loading profile information...</p>;
  }

  return (
    <div className="container">
      <div className="profile-header">
        <div className="picture-info">
          <div className="profile-picture">
            <img src="images/ethere_logo.jpg" alt="Profile Picture" />
          </div>
          <div className="profile-info">
            <h1>{user.name}</h1>
            <p>Email: {user.email}</p>
            <p>Member since: {moment(user.createdAt).format('ll')}</p>
          </div>
        </div>
        <button className="edit-profile-btn" onClick={() => setlogOutForm(true)}>Logout</button>
      </div>
      <div className="profile-body">
        <div className="profile-details">
          <h2>Profile Details</h2>
          <p><strong>Full Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone Number:</strong> provide phone number</p>
          <p><strong>Address:</strong> Please provide address</p>
        </div>
        <div className="order-history">
          <h2>Order History</h2>
          {/* Order history table */}
        </div>
      </div>
      {logoutConfirm && <AdminLogOutConfirm handleLogout={handleLogout} setlogOutForm={setlogOutForm} />}
    </div>
  );
};

export default ProfileSidebar;
