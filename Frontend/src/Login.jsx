import React, { useState, useContext } from 'react';
import axios from "axios";
import "./Login.css";
import { Link } from "react-router-dom";

import MyContext from "./MyContext.jsx";

function Login() {
  const [err, setErr] = useState("");
  const { logIn, setLogIn, setUser } = useContext(MyContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://aion-ai-backend.onrender.com/user/login",
        formData,
        { withCredentials: true }
      );

      setErr(res.data.message);
      console.log(res.data);

      if (res.data.success) {
        
        setLogIn(true);
        if (setUser) setUser(res.data); 
      }
    } catch (err) {
      console.error(err);
      setErr("Login failed. Try again.");
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <div>
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleInput}
            required
          />
        </div>

        <div>
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleInput}
            autoComplete="current-password"
            required
          />
        </div>

        <p>{err}</p>

        <button className="btn">Login</button>

        <p>
          Create new account?{" "}
          <Link to="/signup" className="Link">
            SignUp
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
