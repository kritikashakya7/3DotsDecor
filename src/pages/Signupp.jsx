// src/components/Login.jsx
import React from 'react';
import '../css/Signup.css';

const Login = () => {
  return (
    <div className="container">
      <div className="header">
        <div className="text">SignUp</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <input type="text" placeholder="First Name" />
        </div>
        <div className="input">
          <input type="text" placeholder="Last Name" />
        </div>
        <div className="input">
          <input type="email" placeholder="Email" />
        </div>
        <div className="input">
          <input type="password" placeholder="Password" />
        </div>
      </div>
      <div className='submit-container'>
        <div className='submit'>Sign Up</div>
       
      </div>
      <div className="text-login">Already have an account? <a href='https://colorhunt.co/palettes/green-grey-blue'>Log In</a></div>
    </div>
  );
};

export default Login;
