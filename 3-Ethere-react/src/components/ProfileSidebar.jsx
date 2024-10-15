import { useDispatch, useSelector } from "react-redux";
import summaryApi from "../comman";
import { toast } from "react-toastify";
import { userActions } from "../store/userSlice";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { useEffect, useState } from "react";
import AdminLogOutConfirm from "./AdminLogOutConfirm";
import styles from "../styles/ProfileSidebar.module.css";

const ProfileSidebar = () => {
  const user = useSelector((store) => store?.user?.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutConfirm, setlogOutForm] = useState(false);
  const [orderData, setOrderData] = useState([]);

  const fetchOrder = async () => {
    const response = await fetch(summaryApi.getOrder.url, {
      method: summaryApi.getOrder.method,
      credentials: 'include',
      headers: { "content-type": "application/json" },
    });

    const dataresponse = await response.json();
    if(dataresponse.success)
    {
      setOrderData(dataresponse.data);
      console.log("dataResponse", dataresponse.data);
    }
    if(dataresponse.error)
    {
      toast.error("Failed to fetch order details")
    }
    
    
  };

  useEffect(() => { fetchOrder() }, []);

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

  if (!user) {
    return <p>Loading profile information...</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileHeader}>
        <div className={styles.pictureInfo}>
          <div className={styles.profilePicture}>
            <img src="images/ethere_logo.jpg" alt="Profile Picture" />
          </div>
          <div className={styles.profileInfo}>
            <h1 style={{"text-transform":"capitalize"}}>{user.name}</h1>
            <p>{user.email}</p>
            <p><strong>Member since: </strong>{moment(user.createdAt).format('ll')}</p>
          </div>
        </div>
        <button className={styles.editProfileBtn} onClick={() => setlogOutForm(true)}>Logout</button>
      </div>
      <div className={styles.profileBody}>
        <div className={styles.profileDetails}>
          <h2>Profile Details</h2>
          <p style={{"text-transform":"capitalize"}}><strong>Full Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone Number:</strong> provide phone number</p>
          <p><strong>Address:</strong> Please provide address</p>
        </div>
        <div className={styles.orderHistory}>
          <h2>Order History</h2>
          <table className={styles.ordersTable}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>View Details</th>
              </tr>
            </thead>
            <tbody>
              {orderData.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>₹ {Math.round(order.totalAmount)}</td>
                  <td>{order.paymentStatus}</td>
                  <td>
                    <Link to={`/order-details/${order.orderId}`}>
                      <div>View Details</div>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {logoutConfirm && <AdminLogOutConfirm handleLogout={handleLogout} setlogOutForm={setlogOutForm} />}
    </div>
  );
};

export default ProfileSidebar;
