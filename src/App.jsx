import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Ingredients from "./pages/Ingredients";
import Dashboard from "./pages/Dashboard";
import CoockingInfo from "./pages/CoockingInfo";
import RecipeFind from "./pages/RecipeFind";
import LoadContext from "./context/loadcontext";
import RecipeDetail from "./pages/Recipedetail";
import ForgotPassword from "./components/forgot-password";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/auth" element={<Auth />} />

        <Route path="/ingredients" element={<Ingredients />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/CoockingInfo"
          element={<CoockingInfo />}
        />

        <Route
          path="/RecipeFind"
          element={<RecipeFind />}
        />

        <Route
          path="/recipedetail"
          element={<RecipeDetail />}
        />

        <Route
          path="/loadcontext"
          element={<LoadContext />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;