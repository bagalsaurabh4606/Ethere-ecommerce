import { toast } from "react-toastify";
import summaryApi from "../comman";
import styles from "../styles/AdminLogOutConfirm.module.css";
import { useContext } from "react";
import Context from "../context";



const DeleteAddressConfirm =({setDeleteAddress,id})=>
{
  const { fetchUserDetails } = useContext(Context);
 // console.log(id)
  const fetchDeleteAddress=async(id)=>{
    console.log("address in delete in frontend",id)
    const response=await fetch(summaryApi.DeleteAddress.url,{
      method:summaryApi.DeleteAddress.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        addressId: id,
      }),
      credentials: "include",
    })

    const responseData=await response.json();
    
   
    if(responseData.success){
      toast.success(responseData.message);
      setDeleteAddress(false);
      fetchUserDetails();
    }
    if(responseData.error){
      toast.error(responseData.message);
    }
  }

  return (
    <div className={styles.modal123}>
      <div className={styles.modalContent}>
        <h4>Are you sure you want to delete Address</h4>
        <div className={styles.buttonsss}>
          <button
            id="confirmLogout"
            className={styles.btnn}
           onClick={()=>{fetchDeleteAddress(id)}}
          >
            Delete
          </button>
          <button
            id="cancelLogout"
            className={styles.btnn}
            onClick={() => setDeleteAddress(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteAddressConfirm;