import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [loggedIn, SetLoggedIn] = useState(false);
  const [token, setToken] = useState(() => {
    return localStorage.getItem("userToken");
  });
  const [loading, setLoading] = useState(true);

  // Check whether the saved token is still valid
  useEffect(() => {
    async function verifyUser() {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "https://dummyjson-clone-server.vercel.app/api/auth/me",
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        const result = await response.json();

        if (response.ok && result.username) {
          setUser(result);
          SetLoggedIn(true)
        } else {
          SetLoggedIn(false)
          logout(false);
        }
      } catch (error) {
        SetLoggedIn(false)
        console.error("Authentication error:", error);
        logout(false);
      } finally {
        setLoading(false);
      }
    }

    verifyUser();
  }, [token]);

  // Login
  async function login(formData) {
    try {
      const response = await fetch(
        "https://dummyjson-clone-server.vercel.app/api/auth/login",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (!response.ok || !result.token) {
        return {
          success: false,
          message: result.message || "Invalid username or password",
        };
      }

      localStorage.setItem("userToken", result.token);
      setToken(result.token);

      // Get complete user information
      const userResponse = await fetch(
        "https://dummyjson-clone-server.vercel.app/api/auth/me",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + result.token,
          },
        }
      );

      const userResult = await userResponse.json();

      setUser(userResult);
      SetLoggedIn(true);
      
      return {
        success: true,
        user: userResult,
      };
    } catch (error) {
      SetLoggedIn(true);
      console.error("Login error:", error);

      return {
        success: false,
        message: "Something went wrong. Please try again.",
      };
    }
  }

  // Logout
  function logout(redirect = true) {
    localStorage.removeItem("userToken");

    setToken(null);
    setUser(null);

    if (redirect) {
      navigate("/auth");
    }
  }

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    loggedIn,
    SetLoggedIn
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook
export function useAuth() {
  return useContext(AuthContext);
}