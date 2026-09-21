import React from "react";
import small from "../assets/small.png";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const {
    user,
    logout,
    loading,
  } = useAuth();

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return (
      <header className="navbar">

        <Link
          to="/"
          className="navbar-logo"
        >
          <img
            src={small}
            alt="PantryChef logo"
          />

          <h1>
            PantryChef
          </h1>
        </Link>

      </header>
    );
  }

  return (
    <header className="navbar">

      <Link
        to="/"
        className="navbar-logo"
      >
        <img
          src={small}
          alt="PantryChef logo"
        />

        <h1>
          PantryChef
        </h1>
      </Link>

      <div className="navbar-auth">

        {user ? (

          <div className="user-section">

            <Link
              to="/profile"
              className="user-profile"
            >

              <img
                src={user.image}
                alt={user.username}
                className="user-avatar"
              />

              <span className="user-name">
                {user.firstName}{" "}
                {user.lastName}
              </span>

            </Link>

            <button
              onClick={handleLogout}
              className="logout-button"
            >
              Logout
            </button>

          </div>

        ) : (

          <Link
            to="/auth"
            className="signin-link"
          >
            Sign In
          </Link>

        )}

      </div>

    </header>
  );
}

export default Navbar;