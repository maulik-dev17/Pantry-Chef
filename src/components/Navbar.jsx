import React, { useState } from "react";
import small from "../assets/small.png";
import "../styles/Navbar.css";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Change this according to your AuthContext user object.
  const isAdmin =
    user?.role === "admin" ||
    user?.isAdmin === true ||
    user?.userType === "admin";

  if (loading) {
    return (
      <header className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <img src={small} alt="PantryChef logo" />
            <h1>PantryChef</h1>
          </Link>

          <div className="navbar-loading">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* LOGO */}
        <Link
          to="/"
          className="navbar-logo"
          onClick={closeMenu}
        >
          <img src={small} alt="PantryChef logo" />
          <h1>PantryChef</h1>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="navbar-menu">

          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/ingredients"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            Ingredients
          </NavLink>

          {user && (
            <NavLink
              to="/Recipe"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Recipes
            </NavLink>
          )}

          {/* ADMIN ONLY */}
          {user && isAdmin && (
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `nav-link admin-link ${isActive ? "active" : ""}`
              }
            >
              Admin Dashboard
            </NavLink>
          )}
        </nav>

        {/* RIGHT SIDE */}
        <div className="navbar-right">

          {!user ? (
            <Link
              to="/auth"
              className="signin-button"
            >
              Sign In
            </Link>
          ) : (
            <div className="user-menu">

              <Link
                to="/profile"
                className="user-profile"
              >
                <img
                  src={user.image}
                  alt={user.username || "User"}
                  className="user-avatar"
                />

                <div className="user-info">
                  <span className="user-name">
                    {user.firstName} {user.lastName}
                  </span>

                  {isAdmin && (
                    <span className="user-role">
                      Administrator
                    </span>
                  )}
                </div>
              </Link>

              <button
                onClick={handleLogout}
                className="logout-button"
              >
                Logout
              </button>

            </div>
          )}

          {/* MOBILE MENU BUTTON */}
          <button
            className={`mobile-menu-button ${
              menuOpen ? "open" : ""
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

      </div>

      {/* MOBILE NAVIGATION */}
      <div
        className={`mobile-menu ${
          menuOpen ? "mobile-menu-open" : ""
        }`}
      >

        <NavLink
          to="/"
          onClick={closeMenu}
          className={({ isActive }) =>
            `mobile-nav-link ${isActive ? "active" : ""}`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/ingredients"
          onClick={closeMenu}
          className={({ isActive }) =>
            `mobile-nav-link ${isActive ? "active" : ""}`
          }
        >
          Ingredients
        </NavLink>

        {user && (
          <NavLink
            to="/recipes"
            onClick={closeMenu}
            className={({ isActive }) =>
              `mobile-nav-link ${isActive ? "active" : ""}`
            }
          >
            Recipes
          </NavLink>
        )}

        {user && (
          <NavLink
            to="/profile"
            onClick={closeMenu}
            className={({ isActive }) =>
              `mobile-nav-link ${isActive ? "active" : ""}`
            }
          >
            Profile
          </NavLink>
        )}

        {user && isAdmin && (
          <NavLink
            to="/admin/dashboard"
            onClick={closeMenu}
            className={({ isActive }) =>
              `mobile-nav-link admin-mobile-link ${
                isActive ? "active" : ""
              }`
            }
          >
            Admin Dashboard
          </NavLink>
        )}

        {user && (
          <button
            onClick={handleLogout}
            className="mobile-logout"
          >
            Logout
          </button>
        )}

      </div>
    </header>
  );
}

export default Navbar;