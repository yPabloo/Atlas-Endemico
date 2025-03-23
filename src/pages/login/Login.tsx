import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email === "teste@teste.com" && password === "123456") {
      localStorage.setItem("authToken", "fakeToken123"); // Simula login
      navigate("/"); // Redireciona para a home
    } else {
      alert("Credenciais inválidas!");
    }
  };
  return (
    <Box pb={4} sx={{
      background: '#1E1E1E', 
      minHeight: '100vh', 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Box sx={{ background: '#332F2F', width: '300px', height: '500px', borderRadius: '20px', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <Box sx={{ background: '#332F2F', width: '300px', height: '150px', borderTopLeftRadius: '20px', borderTopRightRadius: '20px', marginBottom: '30px' }}>
          <Box
            component='img'
            src='/images/logo-removebg.png'
            alt='logo'
            sx={{
              width: '100px',
              height: '100px',
            }}
          />
          <Typography sx={{ fontSize: '40px' }}>Atlas Endémico</Typography>
        </Box>
        <Box sx={{ background: "#ffffff", width: "300px", height: "350px", borderRadius: "20px", borderTopLeftRadius: "100px", borderTopRightRadius: "0px" }} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <Typography sx={{ color: "#000000", fontSize: "32px" }} pb={2}>Login</Typography>
          <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ marginBottom: '10px', width: '230px' }} />
          <TextField label="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ width: '230px' }} />
          <Button variant="contained" onClick={handleLogin} sx={{ mt: 2, background: '#000000', width: '230px', height: '50px' }}>Entrar</Button>
          <Typography sx={{ color: "#000000", fontSize: "20px", mt: 3 }}>
            Não tem conta? <Button onClick={() => navigate("/register")}>Cadastre-se</Button>
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Login