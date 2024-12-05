import React, { useState } from "react";
import styles from "../styles/EditAddress.module.css";
import { toast } from "react-toastify";
import summaryApi from "../comman";

const EditAddress = ({ address, onClose, fetchUserDetails }) => {
  const [updatedAddress, setUpdatedAddress] = useState({
    _id:address?._id,
    title: address?.title,
    address: address?.address,
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUpdatedAddress((prev) => ({     
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {

    try {
      const response = await fetch(summaryApi.EditAddress.url, {
        method: summaryApi.EditAddress.method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedAddress),
      });

      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        fetchUserDetails();
        onClose();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to update address. Please try again later.");
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Edit Address</h2>
        <input
          type="text"
          name="title"
          value={updatedAddress.title}
          onChange={handleOnChange}
        />
        <textarea
          name="address"
          value={updatedAddress.address}
          onChange={handleOnChange}
        />
        <div className={styles.actions}>
       
          <button onClick={handleSave} >Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditAddress;
