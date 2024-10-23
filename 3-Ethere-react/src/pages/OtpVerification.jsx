import React, { useState } from 'react';
import styles from '../styles/OtpVerification.module.css';
import summaryApi from '../comman';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const OtpVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [errorMessage, setErrorMessage] = useState('');
  const { userEmail } = useParams();
  console.log(userEmail)
  const navigate = useNavigate();

  const fetchOtp = async () => {
    const otpCode = otp.join(''); // Combine the array of digits into a single string
    const response = await fetch(summaryApi.otpVerification.url, {
      method: summaryApi.otpVerification.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail,
        otp: otpCode
      }),
    });

    const responseData = await response.json();
    const token = responseData.resetToken;

    if (responseData.success) {
     
      toast.success(responseData.message);
      navigate(`/reset-password/${userEmail}/${token}`)
    } 
    if (responseData.error) {
     
      toast.error(responseData.message);


      console.log("else block called with error",responseData.message)
      
    }
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Automatically move to the next input box
      if (value && index < 3) {
        document.getElementById(`otp${index + 1}`).focus();
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h2>Enter OTP</h2>
        <div className={styles.otpContainer}>
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              id={`otp${index}`}
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              className={styles.otpInput}
            />
          ))}
        </div>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        <button className={styles.button} onClick={fetchOtp}>
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default OtpVerification;
