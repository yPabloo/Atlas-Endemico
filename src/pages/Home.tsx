import React from "react";
import { Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove a autenticação
    navigate("/login"); // Redireciona para login
  };

  return (
    <Box textAlign="center" p={4}>
      <Typography variant="h4">Bem-vindo ao Atlas Endêmico</Typography>
      <Button variant="contained" color="error" onClick={handleLogout}>
        Sair
      </Button>
    </Box>
  );
};

export default Home;
