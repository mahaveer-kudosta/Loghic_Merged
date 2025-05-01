import { createTheme } from "@mui/material/styles";

// Custom colors
const colors = {
  primary: {
    main: "#1a73e8",
    light: "#42a5f5",
    dark: "#0d47a1",
    contrastText: "#ffffff",
  },
  secondary: {
    main: "#7b809a",
    light: "#a1a4b6",
    dark: "#585e76",
    contrastText: "#ffffff",
  },
  success: {
    main: "#4CAF50",
    light: "#81c784",
    dark: "#388e3c",
    contrastText: "#ffffff",
  },
  info: {
    main: "#49a3f1",
    light: "#64b6f7",
    dark: "#1e88e5",
    contrastText: "#ffffff",
  },
  warning: {
    main: "#fb8c00",
    light: "#ffa726",
    dark: "#ef6c00",
    contrastText: "#ffffff",
  },
  error: {
    main: "#f44335",
    light: "#e57373",
    dark: "#d32f2f",
    contrastText: "#ffffff",
  },
  text: {
    primary: "#344767",
    secondary: "#7b809a",
    disabled: "#ced4da",
  },
  background: {
    default: "#f0f2f5",
    paper: "#ffffff",
  },
  divider: "#ced4da",
};

// Create theme
const theme = createTheme({
  palette: { ...colors },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.5,
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    button: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.75,
      textTransform: "none",
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    overline: {
      fontSize: "0.75rem",
      fontWeight: 400,
      lineHeight: 1.5,
      textTransform: "uppercase",
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    "none",
    "0px 2px 1px -1px rgba(0, 0, 0, 0.05), 0px 1px 1px 0px rgba(0, 0, 0, 0.03), 0px 1px 3px 0px rgba(0, 0, 0, 0.05)",
    "0px 3px 3px -2px rgba(0, 0, 0, 0.06), 0px 3px 4px 0px rgba(0, 0, 0, 0.04), 0px 1px 8px 0px rgba(0, 0, 0, 0.07)",
    "0px 6px 6px -3px rgba(0, 0, 0, 0.07), 0px 3px 14px 2px rgba(0, 0, 0, 0.02), 0px 5px 5px -3px rgba(0, 0, 0, 0.05)",
    "0px 6px 6px -3px rgba(0, 0, 0, 0.07), 0px 3px 14px 2px rgba(0, 0, 0, 0.02), 0px 5px 5px -3px rgba(0, 0, 0, 0.05)",
    // ... more shadows
    "0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)",
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 20px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0px 7px 14px rgba(0, 0, 0, 0.1)",
          },
        },
        containedPrimary: {
          backgroundImage: "linear-gradient(195deg, #42a5f5, #1976d2)",
        },
        containedSecondary: {
          backgroundImage: "linear-gradient(195deg, #a1a4b6, #7b809a)",
        },
        containedSuccess: {
          backgroundImage: "linear-gradient(195deg, #66bb6a, #43a047)",
        },
        containedInfo: {
          backgroundImage: "linear-gradient(195deg, #64b6f7, #2196f3)",
        },
        containedWarning: {
          backgroundImage: "linear-gradient(195deg, #ffa726, #fb8c00)",
        },
        containedError: {
          backgroundImage: "linear-gradient(195deg, #ef5350, #e53935)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});

export default theme;