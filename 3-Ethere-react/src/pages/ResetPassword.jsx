// import React, { useState } from 'react';
// import styles from '../styles/ResetPassword.module.css';

// const ResetPassword = () => {
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   return (
//     <div className={styles.container}>
//       <div className={styles.form}>
//         <h2>Reset Password</h2>
//         <input
//           type="password"
//           placeholder="Enter new password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//           className={styles.input}
//         />
//         <input
//           type="password"
//           placeholder="Confirm new password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           className={styles.input}
//         />
//         <button className={styles.button}>
//           Update Password
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;

import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import styles from '../styles/ResetPassword.module.css';
import summaryApi from '../comman';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const { userEmail } = useParams();
  console.log("user emaillllll",userEmail)
  // Assume userEmail is passed in location state (or you can store it in localStorage/sessionStorage)
  //onst userEmail = location.state?.email || localStorage.getItem('userEmail');

  const handlePasswordReset = async () => {
    // Validate password match
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch(summaryApi.ResetPassword.url, {
        method: summaryApi.ResetPassword.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail,  // You need to send the email too
          newPassword,
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
      toast.success(result.message)
        setSuccessMessage(result.message);
        // Optionally, navigate to login page
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h2>Reset Password</h2>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        {successMessage && <p className={styles.success}>{successMessage}</p>}
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={styles.input}
        />
        <button className={styles.button} onClick={handlePasswordReset}>
          Update Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
