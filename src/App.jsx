import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Ingredients from "./pages/Ingredients";
import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/ingredients" element={<Ingredients />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;