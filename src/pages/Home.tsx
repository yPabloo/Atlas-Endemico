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
    <Box textAlign="center" p={4}
      sx={{
        background: '#1E1E1E',
        minHeight: '100vh',
        color: '#ffffff'
      }}>
      <Typography variant="h4">Bem-vindo ao Atlas Endêmico</Typography>
      <Box m={5} sx={{ height: '1000px', width: '95%'}}>
        <Typography variant="h4" p={5} textAlign={"left"}>Dashboard</Typography>
        {/* Box dos mapas e gráficos*/}
        <Box ml={4} sx={{}}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row'
          }}>
            <Box sx={{
              display: 'flex',
              width: '710px',
              flexDirection: 'row',
              flexWrap: 'wrap'
            }}>
              <Box mt={2} sx={{ height: '150px', width: '330px', border: '1px solid #E3E3E3' }}></Box>
              <Box mt={2} ml={5} sx={{ height: '150px', width: '330px', border: '1px solid #E3E3E3' }}></Box>
              <Box mt={2} sx={{ height: '300px', width: '700px', border: '1px solid #E3E3E3' }}></Box>
            </Box>
            <Box mt={2} ml={5} sx={{ height: '470px', width: '400px', border: '1px solid #E3E3E3' }}></Box>
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
            <Box mt={2} sx={{ height: '300px', width: '700px', border: '1px solid #E3E3E3' }}></Box>
            <Box mt={2} ml={6} sx={{ height: '300px', width: '400px', border: '1px solid #E3E3E3' }}></Box>
          </Box>
        </Box>
      </Box>
      <Button variant="contained" color="error" onClick={handleLogout}>
        Sair
      </Button>
    </Box>
  );
};

export default Home;
