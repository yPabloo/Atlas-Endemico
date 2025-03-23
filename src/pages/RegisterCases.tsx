import React from "react";
import { Button, Box, Typography } from "@mui/material";

const RegisterCases: React.FC = () => {
  return (
    <Box textAlign="center" p={4}>
      <Typography variant="h4">Bem-vindo ao Atlas Endêmico</Typography>
      <Button variant="contained" color="error">
        Sair
      </Button>
    </Box>
  );
};

export default RegisterCases;
