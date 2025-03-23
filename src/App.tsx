import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import Home from "./pages/Home";

const App: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem("authToken"); // Simulação de autenticação

  return (
    <Router>
      <Routes>
        {/* Rota de Login */}
        <Route path="/login" element={<Login />} />
        
        {/* Rota de Registro */}
        <Route path="/register" element={<Register />} />

        {/* Rota Protegida (Home) */}
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />

        {/* Rota padrão para redirecionamento */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
