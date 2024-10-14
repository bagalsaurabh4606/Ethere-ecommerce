import { Link, useNavigate } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useContext, useState } from "react";
import summaryApi from "../comman";
import { toast } from "react-toastify";
import Context from "../context";

const Login = () => {
  const [ShowPassword, setShowPassword] = useState(true); // State to toggle password visibility
  const [data, setData] = useState({ email: "", password: "" }); // State to store form input data

  const navigate = useNavigate();
  const { fetchUserDetails } = useContext(Context); // Fetch user details after successful login

  // Handle input field changes
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataresponse = await fetch(summaryApi.LogIN.url, {
      method: summaryApi.LogIN.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataApi = await dataresponse.json();

    // Handle successful login
    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/");
      fetchUserDetails(); // Refresh user details after login
    }

    // Handle login error
    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  return (
    <section className="main_section_login">
      <div className="login_container">
        <h2>Login</h2>
        <div className="inner_page">
          <form id="loginForm" onSubmit={handleSubmit}>
            {/* Email input */}
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

            {/* Password input with visibility toggle */}
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
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <span className="eye-icon">
                  {ShowPassword ? <IoMdEyeOff /> : <IoMdEye />}
                </span>
              </div>
            </div>

            {/* Forgot password link */}
            <Link to="/forgot-password" className="forgot-password">
              forgot password
            </Link>

            {/* Submit button */}
            <button type="submit">Login</button>
          </form>

          {/* Sign up redirect */}
          <div className="signin_redirect">
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
