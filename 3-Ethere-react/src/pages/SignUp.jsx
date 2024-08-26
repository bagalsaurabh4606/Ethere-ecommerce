import { Link, useNavigate } from "react-router-dom";
import summaryApi from "../comman";
import { useState } from "react";
import { toast } from "react-toastify";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

const SignUp = () => {
  const [ShowPassword, setShowPassword] = useState(true);
  const [data,setData]=useState({
    name:"",
    email:"",
    password:""
  })

  const handleOnChange=(e)=>{
    const {name,value}=e.target
    setData((preve)=>{
      return{
        ...preve,
        [name]:value
      }
    })
  }
 const navigate=useNavigate()
  const handleSubmit=async (e)=>{

    e.preventDefault()
    const dataresponse=await fetch(summaryApi.SignUP.url,{
      method:summaryApi.SignUP.method,
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(data)
      
      
    })
    // console.log(data);
    const dataApi=await dataresponse.json();
    if(dataApi.success){
      toast.success(dataApi.message)
      navigate("/login")
    }
    if(dataApi.error){
      toast.error(dataApi.message)
    }

  }
  return (
    <section class="main_section_login">
    <div class="signin_container">
      <h2>Sign In</h2>

      <form
        id="signInForm"
        method="post"
        action="/signup"
        onSubmit={handleSubmit}
      >
        <div class="input-box">
          <input
            type="text"
            id="name"
            placeholder="Name"
            name="name"
            
            value={data.name}
            onChange={handleOnChange}
            required
          />
        </div>

        <div class="input-box">
          <input
            type="text"
            id="username"
            placeholder="Email"
            name="email"
            value={data.email}
           
            onChange={handleOnChange}
            required
          />
        </div>

        <div class="password-container">
          <input
            type={ShowPassword ? "password" : "text"}
            id="password"
            placeholder="Password"
            name="password"
            className="password"
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
        

        <div class="input-box">
          <input type="submit" value="Signin" name="" />
        </div>
      </form>

      <div class="signin_redirect">
        <h6>
          Already have account ?? <Link to="/login">Login here</Link>
        </h6>
      </div>
    </div>
    </section>
  );
};
export default SignUp;
