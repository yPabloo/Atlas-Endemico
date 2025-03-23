import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import Home from "./pages/Home";
import RegisterCases from "./pages/RegisterCases";
import Maps from "./pages/Maps";
import Graphs from "./pages/Graphs";
import Config from "./pages/Config";
import MainLayout from "./layout/MainLayout";

const App: React.FC = () => {
  const isAuthenticated = localStorage.getItem("authToken"); // Simulação de autenticação

  return (
    <Router>
      <Routes>
        {/* Rota de Login */}
        <Route path="/login" element={<Login />} />

        {/* Rota de Registro */}
        <Route path="/register" element={<Register />} />

        <Route
          path="/*"
          element={
            <MainLayout>
              <Routes>
                {/* Rota Protegida (Home) */}
                <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />

                {/* Rota Protegida (RegisterCases) */}
                <Route path="/registrarCasos" element={isAuthenticated ? <RegisterCases /> : <Navigate to="/login" />} />

                {/* Rota Protegida (Maps) */}
                <Route path="/Mapas" element={isAuthenticated ? <Maps /> : <Navigate to="/login" />} />

                {/* Rota Protegida (Graphs) */}
                <Route path="/Graficos" element={isAuthenticated ? <Graphs /> : <Navigate to="/login" />} />

                {/* Rota Protegida (Config) */}
                <Route path="/configuracao" element={isAuthenticated ? <Config /> : <Navigate to="/login" />} />

                {/* Rota padrão para redirecionamento */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
