import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginForm({ onSwitch }) {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

async function handleLogin(e) {
  e.preventDefault();

  setError("");
  setLoading(true);

  const result = await login(formData);

  setLoading(false);

  if (result.success) {
    if (result.user.role === "admin") {
      navigate("/Dashboard");
    } else {
      navigate("/Profile");
    }
  } else {
    setError(result.message);
  }
}

  return (
    <div className="form-container">
      <h1>Welcome back!</h1>

      <p className="form-subtitle">
        Enter your login details
      </p>

      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label>Username</label>

          <input
            type="text"
            placeholder="Enter your username"
            onChange={handleChange}
            name="username"
            value={formData.username}
          />
        </div>

        <div className="input-group">
          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            onChange={handleChange}
            name="password"
            value={formData.password}
          />
        </div>

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        <div className="form-options">
          <label>
            <input type="checkbox" />
            Remember me
          </label>

          <Link
            to="/forgot-password"
            className="forgot-link"
          >
            Forgot password?
          </Link>
          
        </div>

        <button
          type="submit"
          className="primary-button"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="divider">
        <span />
        <p>Or</p>
        <span />
      </div>

      <div className="social-buttons">
        <button type="button">
          <b>G</b>
          Google
        </button>

        <button type="button">
          <b></b>
          Apple
        </button>

        <button type="button">
          <b>X</b>
          Twitter
        </button>
      </div>

      <div className="switch-account">
        <span>
          Don't have an account?
        </span>

        <button
          type="button"
          onClick={onSwitch}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default LoginForm;