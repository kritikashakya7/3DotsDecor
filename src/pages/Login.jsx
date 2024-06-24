import "../css/Signup.css";
import Button from "../components/Button";

const Login = () => {
  return (
    <div className="flex">
      <div className="login-container">
        <div className="header">
          <h1 className="text">Login</h1>
        </div>
        <div className="inputs">
          <div className="input">
            <input type="email" placeholder="Email" />
          </div>
          <div className="input">
            <input type="password" placeholder="Password" />
          </div>
        </div>
        <div className="submit-container">
          <Button className="w-full">Login</Button>
        </div>
        <div className="text-login">
          Don&apos;t an account? <a href="/signup">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
