import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    try {
      const sendOtpResponse = await axios.post('http://localhost:8000/send-otp/', {
        email: email
      });
      console.log(sendOtpResponse);

      if (sendOtpResponse.status === 200) {
        // OTP sent successfully, proceed to OTP verification
        const otp = prompt('Enter the OTP:');
        console.log('otp', otp);
        if (otp) {
          const verifyOtpResponse = await axios.post('http://localhost:8000/verify-otp/', {
            otp: otp,
          });
          console.log(email);
          console.log(firstName);
          console.log(lastName);
          console.log(password);
          if (verifyOtpResponse.status === 200) {
            console.log('ver', verifyOtpResponse.status);
            // OTP verified successfully, proceed to user registration
            const registerResponse = await axios.post('http://localhost:8000/register/', {
              email: email,
              firstName: firstName,
              lastName: lastName,
              password: password,
            });

            if (registerResponse.status === 201) {
              // User created successfully
              console.log('User created successfully.');
              navigate('/login');
            } else {
              setErrorMsg(registerResponse.data.error);
            }
          } else {
            setErrorMsg(verifyOtpResponse.data.error);
          }
        } else {
          setErrorMsg('OTP verification failed.');
        }
      } else {
        setErrorMsg(sendOtpResponse.data.error);
      }
    } catch (error) {
      console.log(error);
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="mt-5 container" style={{ paddingTop: '100px' }}>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <br />
        <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <br />
        <br />
        <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <br />
        <br />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {errorMsg && <p>{errorMsg}</p>}
        <br />
        <br />
        <button className="btn btn-dark" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;