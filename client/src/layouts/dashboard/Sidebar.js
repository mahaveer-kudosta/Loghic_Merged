import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Box,
  Tooltip,
  Avatar,
  Typography,
  Collapse,
  ListItemButton,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Business as BusinessIcon,
  Group as GroupIcon,
  Person as PersonIcon,
  Article as ArticleIcon,
  Event as EventIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Settings as SettingsIcon,
  Forum as ForumIcon,
  Notifications as NotificationsIcon,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";

// Contexts
import { useMaterialUIController } from "../../context/MaterialUIContext";
import { useAuthContext } from "../../context/AuthContext";

// Logo
import LogoImage from "../../assets/logo.svg";

// Sidebar width
const drawerWidth = 260;
const miniDrawerWidth = 80;

// Sidebar component
const Sidebar = () => {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, sidenavColor } = controller;
  const { user } = useAuthContext();
  const location = useLocation();

  // Local state for nested lists
  const [companySubMenuOpen, setCompanySubMenuOpen] = useState(false);

  // Handle toggle mini sidenav
  const handleMiniSidenav = () => {
    dispatch({
      type: "MINI_SIDENAV",
      value: !miniSidenav,
    });
  };

  // Handle submenu toggle
  const handleCompanySubMenu = () => {
    setCompanySubMenuOpen(!companySubMenuOpen);
  };

  // Check if route is active
  const isRouteActive = (route) => {
    return location.pathname === route || location.pathname.startsWith(`${route}/`);
  };

  // Navigation items
  const navItems = [
    {
      name: "Dashboard",
      icon: <DashboardIcon />,
      path: "/dashboard",
      active: isRouteActive("/dashboard") && location.pathname === "/dashboard",
    },
    {
      name: "Companies",
      icon: <BusinessIcon />,
      path: "/dashboard/companies",
      active: isRouteActive("/dashboard/companies"),
      hasSubmenu: true,
      submenuOpen: companySubMenuOpen,
      handleSubmenu: handleCompanySubMenu,
      subItems: [
        {
          name: "Browse",
          path: "/dashboard/companies",
          active: location.pathname === "/dashboard/companies",
        },
        {
          name: "Watchlist",
          path: "/dashboard/companies/watchlist",
          active: location.pathname === "/dashboard/companies/watchlist",
        },
        {
          name: "Trending",
          path: "/dashboard/companies/trending",
          active: location.pathname === "/dashboard/companies/trending",
        },
      ],
    },
    {
      name: "Posts",
      icon: <ArticleIcon />,
      path: "/dashboard/posts",
      active: isRouteActive("/dashboard/posts"),
    },
    {
      name: "Events",
      icon: <EventIcon />,
      path: "/dashboard/events",
      active: isRouteActive("/dashboard/events"),
    },
    {
      name: "Advisors",
      icon: <GroupIcon />,
      path: "/dashboard/advisors",
      active: isRouteActive("/dashboard/advisors"),
    },
    {
      name: "Messages",
      icon: <ForumIcon />,
      path: "/dashboard/messages",
      active: isRouteActive("/dashboard/messages"),
    },
    {
      name: "Notifications",
      icon: <NotificationsIcon />,
      path: "/dashboard/notifications",
      active: isRouteActive("/dashboard/notifications"),
    },
    { divider: true },
    {
      name: "Profile",
      icon: <PersonIcon />,
      path: "/dashboard/profile",
      active: isRouteActive("/dashboard/profile"),
    },
    {
      name: "Settings",
      icon: <SettingsIcon />,
      path: "/dashboard/settings",
      active: isRouteActive("/dashboard/settings"),
    },
  ];

  return (
    <Drawer
      variant="permanent"
      className="sidenav"
      sx={{
        width: miniSidenav ? miniDrawerWidth : drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        "& .MuiDrawer-paper": {
          width: miniSidenav ? miniDrawerWidth : drawerWidth,
          backgroundColor: "background.paper",
          transition: "width 0.3s ease",
          overflowX: "hidden",
        },
      }}
    >
      {/* Logo & Toggle */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: miniSidenav ? "center" : "space-between",
          p: 2,
        }}
      >
        {!miniSidenav && (
          <Box
            component={Link}
            to="/dashboard"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "text.primary",
            }}
          >
            <Box
              component="img"
              src={LogoImage}
              alt="Loghic Logo"
              sx={{ height: 40, mr: 1 }}
            />
          </Box>
        )}

        {miniSidenav && (
          <Box
            component={Link}
            to="/dashboard"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              color: "text.primary",
            }}
          >
            <Box
              component="img"
              src={LogoImage}
              alt="Loghic Logo"
              sx={{ height: 40, width: 40 }}
            />
          </Box>
        )}

        <IconButton onClick={handleMiniSidenav}>
          {miniSidenav ? <MenuIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>

      <Divider />

      {/* User Information */}
      <Box
        sx={{
          display: "flex",
          flexDirection: miniSidenav ? "column" : "row",
          alignItems: "center",
          py: 2,
          px: miniSidenav ? 1 : 2,
        }}
      >
        <Avatar
          src={user?.profileImage}
          alt={user?.fullName}
          className="user-avatar"
          sx={{
            width: 40,
            height: 40,
            mb: miniSidenav ? 1 : 0,
            mr: miniSidenav ? 0 : 2,
            bgcolor: `${sidenavColor}.main`,
          }}
        />
        {!miniSidenav && (
          <Box sx={{ ml: 1 }}>
            <Typography variant="subtitle1" fontWeight={600} noWrap>
              {user?.fullName || "User"}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {user?.email || "user@example.com"}
            </Typography>
          </Box>
        )}
      </Box>

      <Divider />

      {/* Navigation */}
      <List sx={{ px: 1 }}>
        {navItems.map((item, index) => {
          if (item.divider) {
            return <Divider key={`divider-${index}`} sx={{ my: 1 }} />;
          }

          if (item.hasSubmenu) {
            return (
              <React.Fragment key={item.name}>
                <ListItem
                  className={
                    item.active ? "sidenav-item active" : "sidenav-item"
                  }
                  disablePadding
                  sx={{ mb: 0.5 }}
                >
                  <ListItemButton
                    onClick={item.handleSubmenu}
                    sx={{
                      py: 1.5,
                      px: miniSidenav ? 1 : 2,
                      borderRadius: "8px",
                    }}
                  >
                    <Tooltip title={miniSidenav ? item.name : ""} placement="right">
                      <ListItemIcon
                        sx={{
                          minWidth: miniSidenav ? "auto" : 36,
                          color: item.active ? `${sidenavColor}.main` : "inherit",
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                    </Tooltip>
                    {!miniSidenav && (
                      <>
                        <ListItemText
                          primary={item.name}
                          sx={{
                            color: item.active ? `${sidenavColor}.main` : "inherit",
                            fontWeight: item.active ? 600 : 400,
                          }}
                        />
                        {item.submenuOpen ? <ExpandLess /> : <ExpandMore />}
                      </>
                    )}
                  </ListItemButton>
                </ListItem>

                {/* Submenu items */}
                <Collapse in={item.submenuOpen && !miniSidenav} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding sx={{ pl: 3 }}>
                    {item.subItems.map((subItem) => (
                      <ListItem
                        key={subItem.name}
                        className={
                          subItem.active ? "sidenav-item active" : "sidenav-item"
                        }
                        disablePadding
                        sx={{ mb: 0.5 }}
                      >
                        <ListItemButton
                          component={Link}
                          to={subItem.path}
                          sx={{
                            py: 1,
                            px: 2,
                            borderRadius: "8px",
                          }}
                        >
                          <ListItemText
                            primary={subItem.name}
                            sx={{
                              color: subItem.active
                                ? `${sidenavColor}.main`
                                : "inherit",
                              fontWeight: subItem.active ? 600 : 400,
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            );
          }

          return (
            <ListItem
              key={item.name}
              className={item.active ? "sidenav-item active" : "sidenav-item"}
              disablePadding
              sx={{ mb: 0.5 }}
            >
              <ListItemButton
                component={Link}
                to={item.path}
                sx={{
                  py: 1.5,
                  px: miniSidenav ? 1 : 2,
                  borderRadius: "8px",
                }}
              >
                <Tooltip title={miniSidenav ? item.name : ""} placement="right">
                  <ListItemIcon
                    sx={{
                      minWidth: miniSidenav ? "auto" : 36,
                      color: item.active ? `${sidenavColor}.main` : "inherit",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                </Tooltip>
                {!miniSidenav && (
                  <ListItemText
                    primary={item.name}
                    sx={{
                      color: item.active ? `${sidenavColor}.main` : "inherit",
                      fontWeight: item.active ? 600 : 400,
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;