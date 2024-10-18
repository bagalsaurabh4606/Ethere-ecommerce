import React, { useEffect, useState } from 'react';
import styles from '../styles/ForgotPassword.module.css';
import summaryApi from '../comman';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const fetchEmail = async(email)=>
  {
    console.log("got email in onlcic",email)
    const response = await fetch(summaryApi.forgotPassword.url,{
      method:summaryApi.forgotPassword.method,
      credentials:"include",
      headers:{
        "content-type":"application/json",
      },
      body: JSON.stringify({userEmail:email})
        
      
    })


    const responseData = await response.json();
    console.log("got response",responseData)
  
  if(responseData.success){
    toast.success(responseData.message);
    navigate(`/otp-verification/${email}`)
  }

    if(responseData.error){
      toast.error(responseData.message);
    }
  }

  // useEffect(()=>{
  //   fetchEmail();
  // },[]);

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h2>Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          required:true
        />
        <button className={styles.button} onClick={()=>fetchEmail(email)}>
          Get OTP
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
