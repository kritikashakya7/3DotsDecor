import "../css/Signup.css";
import Button from "../components/Button";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

const Login = () => {
  const { login } = useAuth();
  const { loginUser } = useAuthContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async () => {
    const response = await login({ email, password });

    if (response.succes) {
      toast.success(response.data.message);
      const token = response.data.token;
      loginUser(token);
      navigate("/");
    } else {
      toast.error(response.error.message);
    }
  };
  return (
    <div className="flex">
      <div className="login-container">
        <div className="header">
          <h1 className="text">Login</h1>
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
        <div className="text-login">
          Don&apos;t an account? <a href="/signup">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
