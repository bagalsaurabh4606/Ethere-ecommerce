import { useState } from "react";
import ROLE from "../comman/role";
import { IoMdClose } from "react-icons/io";
import summaryApi from "../comman";
import { toast } from "react-toastify";
import moment from "moment";
import styles from "../styles/ChangeUserRole.module.css"; // Importing CSS module

const ChangeUserRole = ({
  name,
  email,
  role,
  createdAt,
  userId,
  onClose,
  callFunc,
}) => {
  const [userRole, setUserRole] = useState(role);

  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);
    console.log(e.target.value);
  };

  const UpdateUserRole = async () => {
    const fetchResponse = await fetch(summaryApi.UpdateUser.url, {
      method: summaryApi.UpdateUser.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        role: userRole,
      }),
    });
    const responseData = await fetchResponse.json();

    if (responseData.success) {
      toast.success(responseData.message);
      onClose();
      callFunc();
    }
  };

  return (
    <div className={styles.userRoleBox}>
      <div className={styles.crossIcon} onClick={onClose}>
        <IoMdClose />
      </div>
      <h2>Change User Role</h2>
      <div className={styles.userInfo}>
        <div>
          <label>Name:</label>
          <span>{name}</span>
        </div>
        <div>
          <label>Email:</label>
          <span>{email}</span>
        </div>
        <div>
          <label>Created At:</label>
          <span>{moment(createdAt).format("ll")}</span>
        </div>
        <div className={styles.roleSelect}>
          <label>Role:</label>
          <select value={userRole} onChange={handleOnChangeSelect}>
            {Object.values(ROLE).map((el) => {
              return (
                <option value={el} key={el}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <button className="btn btn-dark" onClick={UpdateUserRole}>
        Update Role
      </button>
    </div>
  );
};

export default ChangeUserRole;
