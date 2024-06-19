import React from "react";
import "../css/Signup.css";

const Signup = () => {
  return (
    <div className="login-container">
      <div className="header">
        <h1 className="text">Sign up</h1>
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
      <div className="submit-container">
        <button className="submit">Sign Up</button>
      </div>
      <div className="text-login">
        Already have an account?{" "}
        <a href="https://colorhunt.co/palettes/green-grey-blue">Log In</a>
      </div>
    </div>
  );
};

export default Signup;
