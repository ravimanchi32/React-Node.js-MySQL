import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function login() {
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem("username", data.name);
          navigate("/welcome");
        } else {
          alert(data.message);
        }
      });
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="title">Sign In</h2>

        <input className="input" placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input className="input" type="password" placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button className="btn" onClick={login}>Login</button>

        <p className="switch-text">
          Don't have an account?{" "}
          <span className="link" onClick={() => navigate("/register")}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
