import "../css/Signup.css";
import Button from "../components/Button";

const Signup = () => {
  return (
    <div className="flex">
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
          <Button className="w-full">Sign up</Button>
        </div>
        <div className="text-login">
          Already have an account? <a href="/login">Log In</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
