import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Box, Container, Card, CssBaseline } from "@mui/material";

// Contexts
import { useAuthContext } from "../../context/AuthContext";
import { useMaterialUIController } from "../../context/MaterialUIContext";

// Assets
import LogoImage from "../../assets/logo.svg";

// Auth Layout Component
const AuthLayout = () => {
  const { isAuthenticated, loading } = useAuthContext();
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/dashboard");
    }
  }, [loading, isAuthenticated, navigate]);

  return (
    <Box
      className={darkMode ? "auth-container dark-mode" : "auth-container"}
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
        background: darkMode
          ? "linear-gradient(135deg, #2c3e50 0%, #1a202c 100%)"
          : "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      <CssBaseline />

      {/* Logo at the top */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          pt: 4,
          pb: 2,
        }}
      >
        <Box component="img" src={LogoImage} alt="Loghic Logo" sx={{ height: 50 }} />
      </Box>

      {/* Main content area */}
      <Container component="main" maxWidth="lg" sx={{ mb: 4, flex: 1, display: "flex", alignItems: "center" }}>
        <Outlet />
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          textAlign: "center",
          color: darkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)",
        }}
      >
        <Box
          sx={{
            fontSize: "0.875rem",
          }}
        >
          © {new Date().getFullYear()} Loghic. All rights reserved.
        </Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;