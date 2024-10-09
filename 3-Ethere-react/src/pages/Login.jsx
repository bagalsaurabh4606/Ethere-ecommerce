import { Link, useNavigate } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useContext, useState } from "react";
import summaryApi from "../comman";
import { toast } from "react-toastify";
import Context from "../context";
import { useDispatch } from "react-redux";
const Login = () => {
  const [ShowPassword, setShowPassword] = useState(true);

  const dispatch = useDispatch();

  const [data,setData]=useState({
    email:"",
    password:""
  })


  const navigate=useNavigate()

  const {fetchUserDetails}=useContext(Context)
 

  const handleOnChange=(e)=>{
    const {name,value}=e.target
    setData((preve)=>{
      return{
        ...preve,
        [name]:value
      }
    })
  }
 
  const handleSubmit=async (e)=>{

    e.preventDefault()
    const dataresponse=await fetch(summaryApi.LogIN.url,{
      method:summaryApi.LogIN.method,
      credentials:'include',
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(data)
      
      
    })
    console.log("got data in login",data);
    const dataApi=await dataresponse.json();
    if(dataApi.success){
      toast.success(dataApi.message)
      
      navigate("/")
      fetchUserDetails()
    }
    if(dataApi.error){
      toast.error(dataApi.message)
    }

  }
  return (
    <section class="main_section_login">
      <div class="login_container">
        <h2>Login</h2>
        <div class="inner_page">
          <form id="loginForm" onSubmit={handleSubmit}>
            <input
              type="text"
              id="username"
              name="email"
              className="username"
              placeholder="Email"
              required
              value={data.email}
              onChange={handleOnChange}
            />

            <div className="password-container">
              <input
                type={ShowPassword ? "password" : "text"}
                id="password"
                className="password"
                name="password"
                placeholder="Password"
                value={data.password}
                onChange={handleOnChange}
                required
                
              />

              <div
                className="eye-container"
                onClick={() => setShowPassword((priv) => !priv)}
              >
                <span className="eye-icon">
                  {ShowPassword ?( <IoMdEyeOff />) : <IoMdEye />}
                </span>
              </div>
            </div>

            <Link to="/forgot-password" className="forgot-password"> forgot password</Link>
            <button type="submit">Login </button>
          </form>
          <div class="signin_redirect">
            <h6>
              Create an Account <Link to="/signup">SignUp</Link>
            </h6>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
