import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";

import "../styles/auth.css";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await loginUser(email, password);

      const user = response.data;

      localStorage.setItem("userId", user.userId);
      localStorage.setItem("email", user.email);
      localStorage.setItem("name", user.name);
      localStorage.setItem("role", user.role);

      navigate("/dashboard");

    } catch (error) {

      setError(
        error.response?.data ||
        "Invalid email or password"
      );

    }
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <div className="auth-logo">
          ✓ TaskFlow
        </div>

        <h1>Welcome Back</h1>

        <p className="auth-subtitle">
          Sign in to manage your tasks
        </p>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="primary-btn">
            Login
          </button>

        </form>

        <p className="auth-footer">
          Don't have an account?
          <Link to="/register"> Create Account</Link>
        </p>

      </div>

    </div>
  );
}

export default Login;