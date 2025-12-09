import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function register() {
    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        navigate("/");
      });
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="title">Register</h2>

        <input className="input" placeholder="Full Name"
          onChange={e => setName(e.target.value)}
        />

        <input className="input" placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input className="input" type="password" placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button className="btn" onClick={register}>Register</button>

        <p className="switch-text">
          Already have an account?{" "}
          <span className="link" onClick={() => navigate("/")}>
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}
