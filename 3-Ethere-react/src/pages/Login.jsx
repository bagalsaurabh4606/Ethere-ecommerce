import { Link, useNavigate } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useContext, useState } from "react";
import summaryApi from "../comman";
import { toast } from "react-toastify";
import Context from "../context";
import { useDispatch } from "react-redux";
import styles from "../styles/Login.module.css"; // Importing CSS module

const Login = () => {
  const [showPassword, setShowPassword] = useState(true);
  const dispatch = useDispatch();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { fetchUserDetails } = useContext(Context);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataResponse = await fetch(summaryApi.LogIN.url, {
      method: summaryApi.LogIN.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("got data in login", data);
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/");
      fetchUserDetails();
    }
    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  return (
    <section className={styles.mainSectionLogin}>
      <div className={styles.loginContainer}>
        <h2>Login</h2>
        <div className={styles.innerPage}>
          <form id="loginForm" onSubmit={handleSubmit}>
            {/* Email input */}
            <input
              type="text"
              id="username"
              name="email"
              className={styles.username}
              placeholder="Email"
              required
              value={data.email}
              onChange={handleOnChange}
            />

            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? "password" : "text"}
                id="password"
                className={styles.password}
                name="password"
                placeholder="Password"
                value={data.password}
                onChange={handleOnChange}
                required
              />
              <div
                className={styles.eyeContainer}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <span className={styles.eyeIcon}>
                  {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                </span>
              </div>
            </div>

            <Link to="/forgot-password" className={styles.forgotPassword}>
              Forgot password?
            </Link>
            <button type="submit">Login</button>
          </form>
          <div className={styles.signinRedirect}>
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
