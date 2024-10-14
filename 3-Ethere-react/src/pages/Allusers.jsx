import { useEffect, useState } from "react";
import summaryApi from "../comman";
import { toast } from "react-toastify";
import { MdEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";
import moment from "moment";

const AllUsers = () => {
  const [allUser, setAllUsers] = useState([]); // State to store all users
  const [openUpdateRole, setOpenUpdateRole] = useState(false); // State to toggle role update modal
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    createdAt: "",
    _id: "",
  }); // State to hold details of the user to be updated

  // Fetch all users from the API
  const fetchAllUsers = async () => {
    try {
      const fetchData = await fetch(summaryApi.AllUsers.url, {
        method: summaryApi.AllUsers.method,
        credentials: "include",
      });
      const dataResponse = await fetchData.json();
      if (dataResponse.success) {
        setAllUsers(dataResponse.data); // Set user data if fetch is successful
      } else if (dataResponse.error) {
        toast.error(dataResponse.message); // Show error message if any
      }
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="user-table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allUser.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user?.name}</td>
              <td>{user?.email}</td>
              <td>{user?.role}</td>
              <td>{moment(user?.createdAt).format("ll")}</td>
              <td
                className="action-icon"
                onClick={() => {
                  setUpdateUserDetails(user); // Set details of selected user for role update
                  setOpenUpdateRole(true); // Open role update modal
                }}
              >
                <MdEdit />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render ChangeUserRole modal if openUpdateRole is true */}
      {openUpdateRole && (
        <div className="user-role-overlay">
          <ChangeUserRole
            onClose={() => setOpenUpdateRole(false)}
            name={updateUserDetails.name}
            email={updateUserDetails.email}
            role={updateUserDetails.role}
            userId={updateUserDetails._id}
            createdAt={updateUserDetails.createdAt}
            callFunc={fetchAllUsers} // Callback to refresh user list after update
          />
        </div>
      )}
    </div>
  );
};

export default AllUsers;
