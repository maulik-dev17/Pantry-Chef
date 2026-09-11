import React from "react";

function SignupForm({ onSwitch }) {

  const handleSignup = async function (e) {
    e.preventDefault();

    // Your existing signup logic
  };

  return (
    <div className="form-container">

      <h1>
        Create account
      </h1>

      <p className="form-subtitle">
        Enter your details
      </p>

      <form onSubmit={handleSignup}>

        <div className="input-group">
          <label>Name</label>

          <input
            type="text"
            placeholder="Enter your name"
          />
        </div>

        <div className="input-group">
          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
          />
        </div>

        <div className="input-group">
          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="primary-button"
        >
          Sign up
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
          <b>𝕏</b>
          Twitter
        </button>

      </div>

      <div className="switch-account">

        <span>
          Already have an account?
        </span>

        <button
          type="button"
          onClick={onSwitch}
        >
          Log in
        </button>

      </div>

    </div>
  );
}

export default SignupForm;