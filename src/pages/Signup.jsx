import "../css/Signup.css";
import Button from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";

const Signup = () => {
  const { signup } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const reset = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  const onSubmit = async () => {
    const response = await signup({ firstName, lastName, email, password });

    if (response.succes) {
      toast.success(response.data);
      reset();
    } else {
      const errors = response.error?.errors || response.error;

      if (errors) {
        Object.values(errors).forEach((error) => {
          toast.error(`${error.message || error}`);
        });
      }
    }
  };
  return (
    <div className="flex">
      <div className="login-container">
        <div className="header">
          <h1 className="text">Sign up</h1>
        </div>
        <div className="inputs">
          <div className="input">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
            />
          </div>
          <div className="input">
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
            />
          </div>
          <div className="input">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="input">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
        </div>
        <div className="submit-container">
          <Button className="w-full" onClick={onSubmit}>
            Sign up
          </Button>
        </div>
        <div className="text-login">
          Already have an account? <a href="/login">Log In</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
