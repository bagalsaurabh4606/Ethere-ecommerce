

import { useDispatch, useSelector } from "react-redux";
import summaryApi from "../comman";
import { toast } from "react-toastify";
import { userActions } from "../store/userSlice";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import AdminLogOutConfirm from "./AdminLogOutConfirm";
import styles from "../styles/ProfileSidebar.module.css";
import { CiCirclePlus } from "react-icons/ci";
import Context from "../context";
import { MdEdit } from "react-icons/md";
import { RiContactsBookLine, RiDeleteBin4Fill } from "react-icons/ri";
import DeleteProductConfirm from "./DeleteProductConfirm";
import DeleteAddressConfirm from "./DeleteAddressConfirm";
import EditAddress from "./EditAddress";

const ProfileSidebar = () => {
  const user = useSelector((store) => store?.user?.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutConfirm, setLogOutForm] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [newAddress, setNewAddress] = useState(false);
  const [addressDetails, setAddressDetails] = useState({
    title: "",
    address: "",
  });
  const { fetchUserDetails } = useContext(Context);
  const [deleteAddress, setDeleteAddress] = useState(false);
  const [editAddress, setEditAddress] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setAddressDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(summaryApi.UpdateProfile.url, {
        method: summaryApi.UpdateProfile.method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(addressDetails),
      });

      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        fetchUserDetails();
        setNewAddress(false);
        setAddressDetails({ title: "", address: "" });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to add address. Please try again later.");
    }
  };

  const fetchOrder = async () => {
    const response = await fetch(summaryApi.getOrder.url, {
      method: summaryApi.getOrder.method,
      credentials: "include",
      headers: { "content-type": "application/json" },
    });

    const dataresponse = await response.json();
    if (dataresponse.success) {
      setOrderData(dataresponse.data);
    }
    if (dataresponse.error) {
      toast.error("Failed to fetch order details");
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

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
            <h1>{user.name}</h1>
            <p>{user.email}</p>
            <p>
              <strong>Member since: </strong>
              {moment(user.createdAt).format("ll")}
            </p>
          </div>
        </div>
        <button
          className={styles.editProfileBtn}
          onClick={() => setLogOutForm(true)}
        >
          Logout
        </button>
      </div>
      <div className={styles.profileBody}>
        <div className={styles.profileDetails}>
          <h2>Profile Details</h2>
          <p className={styles.nameInProfile}>
            <strong>Full Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone Number:</strong> Provide phone number
          </p>
          <div className={styles.addressButtonContainer}>
            <strong>Address:</strong>{" "}
            <button
              className={styles.addAddressBtn}
              onClick={() => setNewAddress(true)}
            >
              Add <CiCirclePlus />
            </button>
          </div>
          {newAddress && (
            <div>
              <form className={styles.addressForm} onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="title"
                  placeholder="Address Type:Home/Office/School"
                  value={addressDetails.title}
                  onChange={handleOnChange}
                />
                <textarea
                  name="address"
                  placeholder="Enter detialed address with pin code"
                  value={addressDetails.address}
                  onChange={handleOnChange}
                />
                <button type="submit" className={styles.saveAddressBtn}>
                  Save Address
                </button>
                <button
                  className={styles.saveAddressBtn}
                  onClick={() => setNewAddress(false)}
                >
                  Cancle
                </button>
              </form>
            </div>
          )}
          <div className={styles.addressList}>
            {user?.addresses?.length > 0 ? (
              user.addresses.map((address, index) => (
                <div key={index} className={styles.addressCard}>
                  <div className={styles.addressTitle}>
                    <span>{address.title}</span>
                    <div className={styles.addressIcons}>
                      <MdEdit onClick={()=>setEditAddress(true)}/>
                      {editAddress && (
                        <div className={styles.deleteAddressOverlay}>
                          <EditAddress address={address} onClose={()=>setEditAddress(false)} fetchUserDetails={fetchUserDetails} />
                        </div>
                      )
                      }
                      <RiDeleteBin4Fill
                        onClick={() => setDeleteAddress(true)}
                      />
                      {deleteAddress && (
                        <div className={styles.deleteAddressOverlay}>
                          <DeleteAddressConfirm
                            setDeleteAddress={setDeleteAddress}
                            id={address._id}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <p className={styles.addressDetails}>{address.address}</p>
                </div>
              ))
            ) : (
              <p>No addresses found. Add a new address!</p>
            )}
          </div>
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
      {logoutConfirm && (
        <AdminLogOutConfirm
          handleLogout={handleLogout}
          setLogOutForm={setLogOutForm}
        />
      )}
    </div>
  );
};

export default ProfileSidebar;

