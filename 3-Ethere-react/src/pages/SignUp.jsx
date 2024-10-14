import { Link, useNavigate } from "react-router-dom";
import summaryApi from "../comman";
import { useState } from "react";
import { toast } from "react-toastify";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(true); // Use camelCase for state naming convention
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(summaryApi.SignUP.url, {
        method: summaryApi.SignUP.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const dataApi = await response.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/login");
      } else if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Sign-up error:", error);
    }
  };

  return (
    <section className="main_section_login">
      <div className="signin_container">
        <h2>Sign Up</h2>

        <form id="signInForm" onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={data.name}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={data.email}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="password-container">
            <input
              type={showPassword ? "password" : "text"}
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleOnChange}
              required
            />
            <div
              className="eye-container"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <span className="eye-icon">
                {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
              </span>
            </div>
          </div>

          <div className="input-box">
            <input type="submit" value="Sign Up" />
          </div>
        </form>

        <div className="signin_redirect">
          <h6>
            Already have an account? <Link to="/login">Login here</Link>
          </h6>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
