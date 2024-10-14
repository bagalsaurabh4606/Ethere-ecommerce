import { Link, useNavigate } from "react-router-dom";
import summaryApi from "../comman";
import { useState } from "react";
import { toast } from "react-toastify";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import styles from "../styles/SignUp.module.css"; // Import the module CSS

const SignUp = () => {
  const [ShowPassword, setShowPassword] = useState(true);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };
  
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataResponse = await fetch(summaryApi.SignUP.url, {
      method: summaryApi.SignUP.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/login");
    }
    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  return (
    <section className={styles.mainSectionLogin}>
      <div className={styles.signinContainer}>
        <h2>Sign In</h2>

        <form
          id="signInForm"
          method="post"
          action="/signup"
          onSubmit={handleSubmit}
        >
          <div className={styles.inputBox}>
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

          <div className={styles.inputBox}>
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

          <div className={styles.passwordContainer}>
            <input
              type={ShowPassword ? "password" : "text"}
              id="password"
              placeholder="Password"
              name="password"
              className={styles.password}
              value={data.password}
              onChange={handleOnChange}
              required
            />
            <div
              className={styles.eyeContainer}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <span className={styles.eyeIcon}>
                {ShowPassword ? <IoMdEyeOff /> : <IoMdEye />}
              </span>
            </div>
          </div>

          <div className={styles.inputBox}>
            <input type="submit" value="SignUp" />
          </div>
        </form>

        <div className={styles.signinRedirect}>
          <h6>
            Already have an account? <Link to="/login">Login here</Link>
          </h6>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
