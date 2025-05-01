import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Badge,
  Avatar,
  Box,
  Divider,
  ListItemIcon,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from "@mui/icons-material";
import { Link, useNavigate, useLocation } from "react-router-dom";

// Contexts
import { useAuthContext } from "../../../context/AuthContext";
import { useNotificationContext } from "../../../context/NotificationContext";
import {
  useMaterialUIController,
  setMiniSidenav,
  setDarkMode,
} from "../../../context/MaterialUIContext";

const Navbar = ({ fixed }) => {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, darkMode } = controller;
  const { user, logout } = useAuthContext();
  const { unreadCount, fetchNotifications } = useNotificationContext();
  const navigate = useNavigate();
  const location = useLocation();

  // State for menu
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);

  // Fetch notifications on component mount
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // Open user menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close user menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Open notifications menu
  const handleNotificationMenuOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
    fetchNotifications();
  };

  // Close notifications menu
  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null);
  };

  // View all notifications
  const handleViewAllNotifications = () => {
    setNotificationAnchorEl(null);
    navigate("/dashboard/notifications");
  };

  // Toggle sidebar
  const handleMiniSidenav = () => {
    setMiniSidenav(dispatch, !miniSidenav);
  };

  // Toggle dark mode
  const handleDarkMode = () => {
    setDarkMode(dispatch, !darkMode);
  };

  // Logout handler
  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate("/auth/signin");
  };

  // Get current page name
  const getPageName = () => {
    const path = location.pathname.split("/").filter((p) => p)[1] || "dashboard";
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <AppBar
      position={fixed ? "fixed" : "static"}
      elevation={0}
      sx={{
        backgroundColor: darkMode ? "#1a1a1a" : "white",
        color: darkMode ? "white" : "#344767",
        borderBottom: `1px solid ${darkMode ? "rgba(255, 255, 255, 0.12)" : "#ced4da"}`,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            color="inherit"
            onClick={handleMiniSidenav}
            edge="start"
            sx={{ mr: 2, display: { lg: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" sx={{ fontWeight: 600 }}>
            {getPageName()}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton color="inherit" onClick={handleDarkMode}>
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>

          <IconButton
            color="inherit"
            onClick={handleNotificationMenuOpen}
            sx={{ ml: 1 }}
          >
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton
            onClick={handleMenuOpen}
            sx={{
              ml: 1,
              ...(Boolean(anchorEl) && {
                bgcolor: darkMode
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.05)",
              }),
            }}
          >
            <Avatar
              alt={user?.fullName || "User"}
              src={user?.profileImage}
              sx={{ width: 32, height: 32 }}
            >
              {user?.fullName ? user.fullName.charAt(0) : "U"}
            </Avatar>
          </IconButton>
        </Box>

        {/* User Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          PaperProps={{
            sx: {
              mt: 1,
              width: 200,
              backgroundColor: darkMode ? "#1e1e1e" : "white",
              color: darkMode ? "white" : "inherit",
            },
          }}
        >
          <MenuItem
            component={Link}
            to="/dashboard/profile"
            onClick={handleMenuClose}
          >
            <ListItemIcon>
              <PersonIcon fontSize="small" color={darkMode ? "inherit" : "primary"} />
            </ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem
            component={Link}
            to="/dashboard/settings"
            onClick={handleMenuClose}
          >
            <ListItemIcon>
              <SettingsIcon fontSize="small" color={darkMode ? "inherit" : "primary"} />
            </ListItemIcon>
            Settings
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" color={darkMode ? "inherit" : "primary"} />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>

        {/* Notifications Menu */}
        <Menu
          anchorEl={notificationAnchorEl}
          open={Boolean(notificationAnchorEl)}
          onClose={handleNotificationMenuClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          PaperProps={{
            sx: {
              mt: 1,
              width: 320,
              maxHeight: 400,
              backgroundColor: darkMode ? "#1e1e1e" : "white",
              color: darkMode ? "white" : "inherit",
            },
          }}
        >
          <MenuItem disabled>
            <Typography variant="subtitle1" fontWeight="bold">
              Notifications
            </Typography>
          </MenuItem>
          <Divider />
          {/* We will render notifications here in a real app */}
          <MenuItem disabled>
            <Typography variant="body2" color="text.secondary">
              No new notifications
            </Typography>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleViewAllNotifications}>
            <Typography
              variant="body2"
              color="primary"
              sx={{ width: "100%", textAlign: "center" }}
            >
              View All
            </Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;