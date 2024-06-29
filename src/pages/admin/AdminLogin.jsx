import React from "react";
import { useState } from "react";
import Button from "../../components/Button";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onLogin = () => {};
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="login-container">
        <div className="header">
          <h1 className="text">Admin Login</h1>
        </div>
        <div className="inputs">
          <div className="input">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="submit-container">
          <Button className="w-full" onClick={onLogin}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
