import { useEffect, useState } from "react";
import summaryApi from "../comman";
import { toast } from "react-toastify";
import { MdEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";
import moment from "moment";
import styles from "../styles/Allusers.module.css"; // Importing CSS module

const Allusers = () => {
  const [allUser, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    createdAt: "",
    _id: "",
  });

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
    <div className={styles.userTableContainer}>
      <table className={styles.userTable}>
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
          {allUser.map((el, index) => (
            <tr key={el._id}>
              <td>{index + 1}</td>
              <td>{el?.name}</td>
              <td>{el?.email}</td>
              <td>{el?.role}</td>
              <td>{moment(el?.createdAt).format('ll')}</td>
              <td 
                className={styles.actionIcon}
                onClick={() => {
                  setUpdateUserDetails(el);
                  setOpenUpdateRole(true);
                }}
              >
                <MdEdit />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {openUpdateRole && (
        <div className={styles.userRoleOverlay}>
          <ChangeUserRole
            onClose={() => setOpenUpdateRole(false)}
            name={updateUserDetails.name}
            email={updateUserDetails.email}
            role={updateUserDetails.role}
            userId={updateUserDetails._id}
            createdAt={updateUserDetails.createdAt}
            callFunc={fetchAllUsers}
          />
        </div>
      )}
    </div>
  );
};

export default Allusers;
