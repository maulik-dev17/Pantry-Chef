import React from "react";
import small from "../assets/small.png";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">

      <Link to="/" className="navbar-logo">
        <img src={small} alt="PantryChef logo" />
        <h1>PantryChef</h1>
      </Link>

      <div className="navbar-auth">
        <Link to="/signin" className="signin-link">
          Sign In
        </Link>
      </div>

    </header>
  );
}

export default Navbar;