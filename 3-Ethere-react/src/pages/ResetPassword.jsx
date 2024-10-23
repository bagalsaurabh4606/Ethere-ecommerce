import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../styles/ResetPassword.module.css';
import summaryApi from '../comman';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { userEmail } = useParams();

  const validatePassword = (password) => {
    // Regular expression to check for minimum 8 characters, at least one digit, and one special character
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const handlePasswordReset = async () => {
    // Check if any field is empty
    if (!newPassword || !confirmPassword) {
      setErrorMessage('Both fields are required.');
      return;
    }

    // Validate password constraints
    if (!validatePassword(newPassword)) {
      setErrorMessage('Password must be at least 8 characters, include one digit and one symbol.');
      return;
    }

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
          userEmail,
          newPassword,
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast.success(result.message);
        setSuccessMessage(result.message);
        setTimeout(() => navigate('/login'), 1000);
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
        {/* {successMessage && <p className={styles.success}>{successMessage}</p>} */}
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={styles.input}
          required
        />
        <button className={styles.button} onClick={handlePasswordReset}>
          Update Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
