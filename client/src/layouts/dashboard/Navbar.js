import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Badge,
  Menu,
  MenuItem,
  Typography,
  Avatar,
  Divider,
  InputBase,
  Tooltip,
  ListItemIcon,
  styled,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  AccountBalanceWallet as WalletIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";

// Contexts
import { useMaterialUIController } from "../../context/MaterialUIContext";
import { useAuthContext } from "../../context/AuthContext";
import { useNotificationContext } from "../../context/NotificationContext";

// Search bar styling
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 100,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

// Navbar component
const Navbar = ({ title, showBackButton, onBackButtonClick }) => {
  const [controller, dispatch] = useMaterialUIController();
  const { darkMode, miniSidenav } = controller;
  const { user, logout } = useAuthContext();
  const { unreadCount } = useNotificationContext();
  const theme = useTheme();

  // Menu anchors
  const [notificationMenuAnchor, setNotificationMenuAnchor] = useState(null);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);

  // Toggle notification menu
  const handleNotificationMenuOpen = (event) => {
    setNotificationMenuAnchor(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationMenuAnchor(null);
  };

  // Toggle profile menu
  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(event.currentTarget);
  };

  // Toggle dark mode
  const handleDarkModeToggle = () => {
    dispatch({
      type: "DARK_MODE",
      value: !darkMode,
    });
  };

  // Handle logout
  const handleLogout = async () => {
    await logout();
    // Redirection will be handled by the auth context through protected routes
  };

  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{
        width: { sm: `calc(100% - ${miniSidenav ? 80 : 260}px)` },
        ml: { sm: `${miniSidenav ? 80 : 260}px` },
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        backdropFilter: "blur(20px)",
        backgroundColor: alpha(
          theme.palette.background.default,
          darkMode ? 0.8 : 0.95
        ),
        transition: "width 0.3s ease, margin-left 0.3s ease",
      }}
    >
      <Toolbar>
        {/* Back Button (if needed) */}
        {showBackButton && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            onClick={onBackButtonClick}
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
        )}

        {/* Page Title */}
        <Typography variant="h6" component="div" fontWeight={600} sx={{ flexGrow: 0 }}>
          {title || "Dashboard"}
        </Typography>

        {/* Search Bar */}
        <Search sx={{ mx: 2, flexGrow: 1 }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search companies, users, posts..."
            inputProps={{ "aria-label": "search" }}
          />
        </Search>

        {/* Right side items */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* Dark Mode Toggle */}
          <Tooltip title={darkMode ? "Light Mode" : "Dark Mode"}>
            <IconButton
              size="large"
              color="inherit"
              onClick={handleDarkModeToggle}
              sx={{ mr: 1 }}
            >
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>

          {/* Notifications */}
          <Tooltip title="Notifications">
            <IconButton
              size="large"
              color="inherit"
              onClick={handleNotificationMenuOpen}
              sx={{ mr: 1, position: "relative" }}
            >
              <Badge badgeContent={unreadCount} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Profile Menu */}
          <Tooltip title="Account">
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              onClick={handleProfileMenuOpen}
            >
              <Avatar
                src={user?.profileImage}
                alt={user?.fullName}
                sx={{ width: 32, height: 32, bgcolor: "primary.main" }}
              >
                {user?.fullName?.charAt(0) || "U"}
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>

        {/* Notifications Menu */}
        <Menu
          anchorEl={notificationMenuAnchor}
          id="notifications-menu"
          keepMounted
          open={Boolean(notificationMenuAnchor)}
          onClose={handleNotificationMenuClose}
          PaperProps={{
            sx: { width: 320, maxHeight: 400, mt: 2 },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <Box sx={{ px: 2, py: 1.5, display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" fontWeight={600}>
              Notifications
            </Typography>
            <Typography
              variant="body2"
              color="primary"
              component={Link}
              to="/dashboard/notifications"
              sx={{ textDecoration: "none", cursor: "pointer" }}
              onClick={handleNotificationMenuClose}
            >
              View All
            </Typography>
          </Box>
          <Divider />
          <MenuItem onClick={handleNotificationMenuClose}>
            <Box sx={{ width: "100%" }}>
              <Typography variant="subtitle2" fontWeight={500}>
                New Company Added
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Apple Inc. has been added to the watchlist
              </Typography>
              <Typography variant="caption" color="text.secondary">
                2 hours ago
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem onClick={handleNotificationMenuClose}>
            <Box sx={{ width: "100%" }}>
              <Typography variant="subtitle2" fontWeight={500}>
                Upcoming Event
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Microsoft Earnings Call scheduled for tomorrow
              </Typography>
              <Typography variant="caption" color="text.secondary">
                1 day ago
              </Typography>
            </Box>
          </MenuItem>
          <Divider />
          <Box sx={{ px: 2, py: 1 }}>
            <Typography
              variant="body2"
              color="primary"
              align="center"
              sx={{ cursor: "pointer" }}
              onClick={handleNotificationMenuClose}
            >
              Mark all as read
            </Typography>
          </Box>
        </Menu>

        {/* Profile Menu */}
        <Menu
          anchorEl={profileMenuAnchor}
          id="profile-menu"
          keepMounted
          open={Boolean(profileMenuAnchor)}
          onClose={handleProfileMenuClose}
          PaperProps={{
            sx: { width: 220, mt: 2 },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              {user?.fullName || "User"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.email || "user@example.com"}
            </Typography>
          </Box>
          <Divider />
          <MenuItem
            component={Link}
            to="/dashboard/profile"
            onClick={handleProfileMenuClose}
          >
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem
            component={Link}
            to="/dashboard/account"
            onClick={handleProfileMenuClose}
          >
            <ListItemIcon>
              <WalletIcon fontSize="small" />
            </ListItemIcon>
            Account
          </MenuItem>
          <MenuItem
            component={Link}
            to="/dashboard/settings"
            onClick={handleProfileMenuClose}
          >
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;