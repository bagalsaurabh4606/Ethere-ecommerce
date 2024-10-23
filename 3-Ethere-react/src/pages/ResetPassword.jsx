import React, { useState, useEffect } from 'react';
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
  const { userEmail, token } = useParams(); // Extract token from URL
  
  useEffect(() => {
    // Check if the token is present and valid
    if (!token) {
      toast.error('Invalid or expired reset link.');
      navigate('/forgot-password'); // Redirect to forgot password page if no valid token
    }
  }, [token, navigate]);

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const handlePasswordReset = async () => {
    if (!newPassword || !confirmPassword) {
      setErrorMessage('Both fields are required.');
      return;
    }

    if (!validatePassword(newPassword)) {
      setErrorMessage('Password must be at least 8 characters, include one digit and one symbol.');
      return;
    }

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
          token, // Send token for verification
          newPassword,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
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
