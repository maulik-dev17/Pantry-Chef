import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/ForgotPassword.css";
import drak from "../assets/logos.png";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email) {
      return;
    }

    setLoading(true);

    try {
      /*
        When you have your own backend, replace this
        with your real forgot-password API.

        Example:

        const response = await fetch(
          "http://localhost:5000/api/auth/forgot-password",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );

        const result = await response.json();
      */

      await new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );

      setSubmitted(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="forgot-page">

      <div className="forgot-card">

        <img src={drak} alt="logos" className="logos"/>

        {!submitted ? (
          <>
            <h1>
              Forgot your password?
            </h1>

            <p className="forgot-subtitle">
              No worries! Enter your email address and
              we'll help you reset your password.
            </p>

            <form onSubmit={handleSubmit}>

              <div className="forgot-input-group">

                <label htmlFor="email">
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />

              </div>

              <button
                type="submit"
                className="forgot-button"
                disabled={loading}
              >
                {loading
                  ? "Sending..."
                  : "Send reset link"}
              </button>

            </form>

            <div className="back-login">

              <span>
                Remember your password?
              </span>

              <Link to="/auth">
                Back to login
              </Link>

            </div>
          </>
        ) : (
          <>
            <div className="success-icon">
              ✓
            </div>

            <h1>
              Check your email
            </h1>

            <p className="forgot-subtitle">
              We've sent a password reset link to
              <strong> {email}</strong>.
            </p>

            <p className="email-note">
              If you don't see the email, check your
              spam or junk folder.
            </p>

            <button
              className="forgot-button"
              onClick={() => setSubmitted(false)}
            >
              Try another email
            </button>

            <div className="back-login">
              <Link to="/auth">
                ← Back to login
              </Link>
            </div>
          </>
        )}

      </div>

    </main>
  );
}

export default ForgotPassword;

