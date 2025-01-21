import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./componentes/Navbar";
import Login from "./componentes/Login";
import Register from "./componentes/Register";
import Home from "./componentes/Home";
import Posts from "./componentes/Posts";
import Comments from "./componentes/Comments";
import AcercaDe from "./componentes/AcercaDe";
import GestionUsuarios from "./componentes/Users";
import "./componentes/GestionUsuarios.css"
import "./App.css";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<"Publicador" | "Administrador" | null>(null);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    const userRole = localStorage.getItem("role");

    if (authStatus === "true" && userRole) {
      setIsAuthenticated(true);
      setRole(userRole as "Publicador" | "Administrador");
    }
  }, []);

  const handleLogin = (userRole: "Publicador" | "Administrador") => {
    setIsAuthenticated(true);
    setRole(userRole);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("role", userRole);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setRole(null);
    localStorage.clear();
  };

  return (
    <Router>
      {isAuthenticated && <Navbar onLogout={handleLogout} role={role} />}
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/users"
          element={role === "Administrador" ? <GestionUsuarios /> : <Navigate to="/" />}
        />
        <Route path="/posts" element={isAuthenticated ? <Posts /> : <Navigate to="/login" />} />
        <Route path="/comments" element={isAuthenticated ? <Comments /> : <Navigate to="/login" />} />
        <Route path="/acerca_de" element={<AcercaDe />} />
      </Routes>
    </Router>
  );
};

export default App;




