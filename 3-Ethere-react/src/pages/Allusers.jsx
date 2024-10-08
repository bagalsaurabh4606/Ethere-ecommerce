import { useEffect, useState } from "react";
import summaryApi from "../comman";
import { toast } from "react-toastify";
import { MdEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";
import moment from "moment";

const Allusers = () => {
  const [allUser, setAllUsers] = useState([]);
  const [openUpdateRole,setOpenUpdateRole]=useState(false)
  const [updateUserDetails,setUpdateUserDetails]=useState({
    email:"",
    name:"",
    role:"",
    createdAt:"",
    _id:"",
  })


  const fetchAllUsers = async () => {
    const fetchdata = await fetch(summaryApi.AllUsers.url, {
      method: summaryApi.AllUsers.method,
      credentials: "include",
    });
    const dataResponse = await fetchdata.json();
    if (dataResponse.success) {
      setAllUsers(dataResponse.data);
    }
    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

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
        <tbody>{allUser.map((el, index) => {
          return <tr key={el._id}>
            <td>
              {index+1}
            </td>
            <td>{el?.name}</td>
            <td>{el?.email}</td>
            <td>{el?.role}</td>
            <td>{moment(el?.createdAt).format('ll')}</td>
            <td className="action-icon"
             onClick={()=>{
              setUpdateUserDetails(el)
              setOpenUpdateRole(true)

             }}

             ><MdEdit/></td>
            
          </tr>
        })}</tbody>
      </table>
      {
        openUpdateRole && (
          <div className="user-role-overlay">
          <ChangeUserRole onClose={()=>setOpenUpdateRole(false)} 
        name={updateUserDetails.name}
        email={updateUserDetails.email}
        role={updateUserDetails.role}
        userId={updateUserDetails._id}
        createdAt={updateUserDetails.createdAt}
        callFunc={fetchAllUsers}
        />
        </div>
      )
      }
     
    </div>
  );
};

export default Allusers;
