import React from "react";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import Sidebar from "./SideBar";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const hideSidebar = ["/login", "/register"].includes(location.pathname);

  return (
    <Box sx={{ display: "flex" }}>
      {!hideSidebar && <Sidebar />}
      <Box sx={{ flexGrow: 1}}>{children}</Box>
    </Box>
  );
};

export default MainLayout;
