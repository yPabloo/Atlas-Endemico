import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import { useNavigate } from "react-router-dom";

const SideBar: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => setOpen(!open);

  const menuItems = [
    { text: "Página Inicial", icon: <HomeIcon />, path: "/" },
    { text: "Mapas", icon: <MapIcon />, path: "/mapas" },
    { text: "Gráficos", icon: <BarChartIcon />, path: "/graficos" },
    { text: "Registrar Casos", icon: <NoteAltIcon />, path: "/registrarCasos" },
    { text: "Configurações", icon: <SettingsIcon />, path: "/configuracoes" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <>
      <IconButton onClick={toggleDrawer} sx={{ position: "fixed", top: 10, left: 10, color: "white" }}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        <Box sx={{ width: 250, padding: 2 }}>
          <List>
            {menuItems.map((item) => (
              <ListItem 
                key={item.text} 
                component="button" // Adiciona a propriedade correta
                onClick={() => navigate(item.path)}
                sx={{ display: "flex", alignItems: "center", gap: 1, border: "none", background: "none", cursor: "pointer", padding: "10px", width: "100%" }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
            <ListItem 
              component="button"
              onClick={handleLogout}
              sx={{ display: "flex", alignItems: "center", gap: 1, border: "none", background: "none", cursor: "pointer", padding: "10px", width: "100%" }}
            >
              <ListItemIcon><ExitToAppIcon /></ListItemIcon>
              <ListItemText primary="Sair" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default SideBar;
