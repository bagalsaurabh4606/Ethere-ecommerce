import React from "react";
import styles from "../styles/AdminLogOutConfirm.module.css"; // Import the CSS module

const AdminLogOutConfirm = ({ handleLogout, setLogOutForm }) => {
  return (
    <div className={styles.modal123}>
      <div className={styles.modalContent}>
        <h2>Are you sure you want to log out?</h2>
        <div className={styles.buttonsss}>
          <button
            id="confirmLogout"
            className={styles.btnn}
            onClick={handleLogout}
          >
            Logout
          </button>
          <button
            id="cancelLogout"
            className={styles.btnn}
            onClick={() => setLogOutForm(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogOutConfirm;
