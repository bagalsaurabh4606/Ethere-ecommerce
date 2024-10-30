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
    password: "",
  });
  const [passwordError, setPasswordError] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });

    // Reset the password error when user starts typing
    if (name === "password") {
      setPasswordError("");
    }
  };

  const navigate = useNavigate();

  // Function to validate the password
  const validatePassword = (password) => {
    // Password must be more than 8 characters, contain at least one digit and one symbol
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if the password is valid
    if (!validatePassword(data.password)) {
      setPasswordError("Password must be at least 8 characters long, include at least one digit and one special character.");
      return;
    }

    const dataResponse = await fetch(summaryApi.SignUP.url, {
      method: summaryApi.SignUP.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
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

          {/* Display the password validation message */}
          {passwordError && (
            <p className={styles.errorText}>{passwordError}</p>
          )}

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
