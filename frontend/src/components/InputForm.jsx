import React from "react";
import { useState } from "react";
import axios from "axios";

const InputForm = ({ setIsOpen }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    let endpoint = isSignUp ? "register" : "login";
    await axios
      .post(`http://localhost:3000/${endpoint}`, { name, email, password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setIsOpen();
      })
      .catch((data) => setError(data.response?.data?.error));
  };
  return (
    <>
      <form className="form" onSubmit={handleOnSubmit}>
        {isSignUp && (
          <div className="form-control">
            <label>Name</label>
            <input
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
              className="input"
              required
            />
          </div>
        )}
        <div className="form-control">
          <label>Email</label>
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="form-control">
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            required
          />
        </div>
        <button type="submit">{isSignUp ? "Sign Up" : "Login"}</button>
        <br />
       {(error!="") && <h6 className="error)">{error}</h6>}
        <p onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? "Already Have an account" : "Create new account"}
        </p>
      </form>
    </>
  );
};

export default InputForm;
