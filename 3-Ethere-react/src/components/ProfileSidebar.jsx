import { useDispatch, useSelector } from "react-redux";
import summaryApi from "../comman";
import { toast } from "react-toastify";
import { userActions } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const ProfileSidebar=()=>{
  const user=useSelector((store)=>store?.user?.data);
  const navigate=useNavigate();
  const dispatch=useDispatch();
 
  
  const handleLogout = async () => {
    try {
      console.log("Logging out...");
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
  return <>
  <div class="container">
        <div class="profile-header">
          <div className="picture-info">
          <div class="profile-picture">
                <img src="images/ethere_logo.jpg" alt="Profile Picture"/>
            </div>
            <div class="profile-info">
                <h1>{user.name}</h1>
                <p>Email: {user.email}</p>
                <p>Member since: {moment(user.createdAt).format('ll')}</p>
            </div>
          </div>

            <button className="edit-profile-btn" onClick={handleLogout}>Logout</button>
        </div>
        <div class="profile-body">
            <div class="profile-details">
                <h2>Profile Details</h2>
                <p><strong>Full Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone Number:</strong> provide phone number</p>
                <p><strong>Address:</strong> Please provide address</p>
            </div>
            <div class="order-history">
                <h2>Order History</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>12345</td>
                            <td>Earings</td>
                            <td>2023-07-20</td>
                            <td>Delivered</td>
                            <td>$59.99</td>
                        </tr>
                        <tr>
                            <td>12346</td>
                            <td>Earings</td>
                            <td>2023-07-18</td>
                            <td>Processing</td>
                            <td>$39.99</td>
                        </tr>
                       
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  </>
}
export default ProfileSidebar;