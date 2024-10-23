import React, { useEffect } from "react";
import styles from "../styles/AdminLogOutConfirm.module.css"; // Import the CSS module
import summaryApi from "../comman";
import { toast } from "react-toastify";

const DeleteProductConfirm = ({ setDeleteProduct,product,fetchData }) => {
  const fetchdeleteproduct=async(product)=>{
    console.log("productttt in delete in frontend",product.id)
    const response=await fetch(summaryApi.deleteProduct.url,{
      method:summaryApi.deleteProduct.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: product.id,
      }),
      credentials: "include",
    })

    const responseData=await response.json();
    if(responseData.success){
      toast.success(responseData.message);
      fetchData();
      setDeleteProduct(false);
    }
    if(responseData.error){
      toast.error(responseData.message);
    }
  }

  return (
    <div className={styles.modal123}>
      <div className={styles.modalContent}>
        <h4>Are you sure you want to delete Product</h4>
        <div className={styles.buttonsss}>
          <button
            id="confirmLogout"
            className={styles.btnn}
           onClick={()=>{fetchdeleteproduct(product)}}
          >
            Delete
          </button>
          <button
            id="cancelLogout"
            className={styles.btnn}
            onClick={() => setDeleteProduct(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductConfirm;
