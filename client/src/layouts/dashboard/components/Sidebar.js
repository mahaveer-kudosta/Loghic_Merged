import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Typography,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";

// Material UI controller
import {
  useMaterialUIController,
  setMiniSidenav,
} from "../../../context/MaterialUIContext";

// Logo
import LoghicLogo from "../../../assets/logo.png";

const Sidebar = ({ routes, onMouseEnter, onMouseLeave }) => {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, darkMode } = controller;
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  // Render routes on sidebar
  const renderRoutes = routes.map(
    ({ type, name, icon, route, noSidebar, key }) => {
      // Skip routes that should not appear in the sidebar
      if (noSidebar) return null;

      // Check if current route is active
      const isActive = location.pathname === route;

      return (
        <ListItem key={key} disablePadding sx={{ mb: 1 }}>
          <ListItemButton
            component={Link}
            to={route}
            sx={{
              borderRadius: "8px",
              py: 1.25,
              px: 2,
              ...(isActive && {
                backgroundColor: darkMode
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.05)",
                "&:hover": {
                  backgroundColor: darkMode
                    ? "rgba(255, 255, 255, 0.15)"
                    : "rgba(0, 0, 0, 0.1)",
                },
              }),
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: miniSidenav ? "auto" : 40,
                color: isActive ? "#1a73e8" : darkMode ? "white" : "#7b809a",
              }}
            >
              {icon}
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  variant="button"
                  fontWeight={isActive ? 600 : 400}
                  color={
                    isActive
                      ? "#1a73e8"
                      : darkMode
                      ? "white"
                      : "#7b809a"
                  }
                  sx={{
                    opacity: miniSidenav ? 0 : 1,
                    transition: "opacity 200ms ease-in-out",
                  }}
                >
                  {name}
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
      );
    }
  );

  // Mobile sidebar handlers
  const closeSidebarOnMobile = () => {
    if (isMobile) {
      setMiniSidenav(dispatch, true);
    }
  };

  // Drawer content
  const drawerContent = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: darkMode ? "#1a1a1a" : "white",
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: miniSidenav ? 2 : 3,
          justifyContent: miniSidenav ? "center" : "flex-start",
        }}
      >
        <Box
          component="img"
          src={LoghicLogo}
          alt="Loghic Logo"
          sx={{
            height: miniSidenav ? 32 : 40,
            transition: "height 200ms ease-in-out",
          }}
        />
        {!miniSidenav && (
          <Typography
            variant="h6"
            color={darkMode ? "white" : "#344767"}
            fontWeight={600}
            sx={{
              ml: 1,
              opacity: miniSidenav ? 0 : 1,
              transition: "opacity 200ms ease-in-out",
            }}
          >
            Loghic
          </Typography>
        )}
      </Box>

      <Divider
        sx={{
          my: 1,
          borderColor: darkMode ? "rgba(255, 255, 255, 0.12)" : "#ced4da",
        }}
      />

      {/* Routes list */}
      <List
        sx={{
          p: 2,
          overflowY: "auto",
          flexGrow: 1,
        }}
      >
        {renderRoutes}
      </List>

      {/* Version */}
      <Box
        sx={{
          p: miniSidenav ? 1 : 2,
          textAlign: miniSidenav ? "center" : "left",
        }}
      >
        <Typography
          variant="caption"
          color={darkMode ? "rgba(255, 255, 255, 0.5)" : "#7b809a"}
          sx={{
            opacity: miniSidenav ? 0 : 1,
            transition: "opacity 200ms ease-in-out",
          }}
        >
          Loghic v1.0.0
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { lg: miniSidenav ? 80 : 250 },
        flexShrink: 0,
      }}
    >
      {/* Mobile drawer (temporary) */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={!miniSidenav}
          onClose={() => setMiniSidenav(dispatch, true)}
          ModalProps={{
            keepMounted: true, // Better mobile performance
          }}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 250,
              borderRight: `1px solid ${
                darkMode ? "rgba(255, 255, 255, 0.12)" : "#ced4da"
              }`,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        // Desktop drawer (permanent)
        <Drawer
          variant="permanent"
          open={!miniSidenav}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          sx={{
            display: { xs: "none", lg: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: miniSidenav ? 80 : 250,
              borderRight: `1px solid ${
                darkMode ? "rgba(255, 255, 255, 0.12)" : "#ced4da"
              }`,
              transition: "width 200ms ease-in-out",
              overflowX: "hidden",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;