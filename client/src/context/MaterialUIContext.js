import React, { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";

// Main context
const MaterialUI = createContext();

// Custom hook for using context
export const useMaterialUIController = () => {
  const context = useContext(MaterialUI);

  if (!context) {
    throw new Error(
      "useMaterialUIController should be used inside the MaterialUIControllerProvider."
    );
  }

  return context;
};

// Material Dashboard 2 PRO React base styles
const colors = {
  primary: {
    main: "#1976d2",
    focus: "#0d47a1",
  },
  secondary: {
    main: "#5A738E",
  },
  info: {
    main: "#03a9f4",
    focus: "#01579b",
  },
  success: {
    main: "#4caf50",
    focus: "#1b5e20",
  },
  warning: {
    main: "#ff9800",
    focus: "#e65100",
  },
  error: {
    main: "#f44336",
    focus: "#b71c1c",
  },
  light: {
    main: "#f0f2f5",
  },
  dark: {
    main: "#344767",
    focus: "#121212",
  },
};

// Context value default
const defaultValue = {
  miniSidenav: false,
  transparentSidenav: false,
  sidenavColor: "primary",
  transparentNavbar: true,
  fixedNavbar: true,
  openConfigurator: false,
  direction: "ltr",
  layout: "dashboard",
  darkMode: false,
  colors,
};

// Reducer types
const MINI_SIDENAV = "MINI_SIDENAV";
const TRANSPARENT_SIDENAV = "TRANSPARENT_SIDENAV";
const SIDENAV_COLOR = "SIDENAV_COLOR";
const TRANSPARENT_NAVBAR = "TRANSPARENT_NAVBAR";
const FIXED_NAVBAR = "FIXED_NAVBAR";
const OPEN_CONFIGURATOR = "OPEN_CONFIGURATOR";
const DIRECTION = "DIRECTION";
const LAYOUT = "LAYOUT";
const DARK_MODE = "DARK_MODE";

// Reducer function
function reducer(state, action) {
  switch (action.type) {
    case MINI_SIDENAV: {
      return { ...state, miniSidenav: action.value };
    }
    case TRANSPARENT_SIDENAV: {
      return { ...state, transparentSidenav: action.value };
    }
    case SIDENAV_COLOR: {
      return { ...state, sidenavColor: action.value };
    }
    case TRANSPARENT_NAVBAR: {
      return { ...state, transparentNavbar: action.value };
    }
    case FIXED_NAVBAR: {
      return { ...state, fixedNavbar: action.value };
    }
    case OPEN_CONFIGURATOR: {
      return { ...state, openConfigurator: action.value };
    }
    case DIRECTION: {
      return { ...state, direction: action.value };
    }
    case LAYOUT: {
      return { ...state, layout: action.value };
    }
    case DARK_MODE: {
      return { ...state, darkMode: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// Material UI context provider
export function MaterialUIControllerProvider({ children }) {
  const [controller, dispatch] = useReducer(reducer, defaultValue);

  const value = [controller, dispatch];

  // Custom functions to modify state
  const setMiniSidenav = (dispatch, value) =>
    dispatch({ type: MINI_SIDENAV, value });
  const setTransparentSidenav = (dispatch, value) =>
    dispatch({ type: TRANSPARENT_SIDENAV, value });
  const setSidenavColor = (dispatch, value) =>
    dispatch({ type: SIDENAV_COLOR, value });
  const setTransparentNavbar = (dispatch, value) =>
    dispatch({ type: TRANSPARENT_NAVBAR, value });
  const setFixedNavbar = (dispatch, value) =>
    dispatch({ type: FIXED_NAVBAR, value });
  const setOpenConfigurator = (dispatch, value) =>
    dispatch({ type: OPEN_CONFIGURATOR, value });
  const setDirection = (dispatch, value) =>
    dispatch({ type: DIRECTION, value });
  const setLayout = (dispatch, value) => dispatch({ type: LAYOUT, value });
  const setDarkMode = (dispatch, value) => dispatch({ type: DARK_MODE, value });

  // Adding helper functions to context
  value.setMiniSidenav = (val) => setMiniSidenav(dispatch, val);
  value.setTransparentSidenav = (val) => setTransparentSidenav(dispatch, val);
  value.setSidenavColor = (val) => setSidenavColor(dispatch, val);
  value.setTransparentNavbar = (val) => setTransparentNavbar(dispatch, val);
  value.setFixedNavbar = (val) => setFixedNavbar(dispatch, val);
  value.setOpenConfigurator = (val) => setOpenConfigurator(dispatch, val);
  value.setDirection = (val) => setDirection(dispatch, val);
  value.setLayout = (val) => setLayout(dispatch, val);
  value.setDarkMode = (val) => setDarkMode(dispatch, val);

  return <MaterialUI.Provider value={value}>{children}</MaterialUI.Provider>;
}

// Typechecking props for the MaterialUIControllerProvider
MaterialUIControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Export context module
export default MaterialUI;