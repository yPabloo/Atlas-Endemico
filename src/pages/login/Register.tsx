import React from 'react'
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from '@mui/material'

const Register: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box pt={4} pb={6} sx={{
      background: '#1E1E1E',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Box sx={{ background: '#332F2F', width: '300px', height: '700px', borderRadius: '20px', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
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
        <Box sx={{ background: "#ffffff", width: "300px", height: "550px", borderRadius: "20px", borderTopLeftRadius: "100px", borderTopRightRadius: "0px" }} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <Typography sx={{ color: "#000000", fontSize: "32px" }} pb={2}>Cadastro</Typography>
          <TextField label="Primeiro Nome" sx={{ marginBottom: '10px', width: '230px' }} />
          <TextField label="Sobrenome" sx={{ marginBottom: '10px', width: '230px' }} />
          <TextField label="Email" sx={{ marginBottom: '10px', width: '230px' }} />
          <TextField label="Senha" type="password" sx={{ marginBottom: '10px', width: '230px' }} />
          <TextField label="Confirmar Senha" type="password" sx={{ width: '230px' }} />

          <Button variant="contained" sx={{ mt: 2, background: '#000000', width: '230px', height: '50px' }}>Cadastrar</Button>
          <Typography sx={{ color: "#000000", fontSize: "20px", mt: 3 }}>
            Já tem conta? <Button onClick={() => navigate("/login")}>Login</Button>
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Register