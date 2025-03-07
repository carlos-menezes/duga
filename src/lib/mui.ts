import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FFFFFF", // White
      contrastText: "#000000", // Black
    },
    secondary: {
      main: "#000000", // Black
      contrastText: "#FFFFFF", // White
    },
    background: {
      default: "#000000", // Black
      paper: "#121212", // Dark Gray for better readability
    },
    text: {
      primary: "#FFFFFF", // White
      secondary: "#B0B0B0", // Light Gray for softer contrast
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily: "monospace",
          fontSize: "0.75rem",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontFamily: "monospace",
          fontSize: "0.75rem",
        },
      },
    },
  },
  shape: {
    borderRadius: 0,
  },
});

type TBreakpoint = "mobile";
export const breakpoints: Record<TBreakpoint, string> = {
  mobile: theme.breakpoints.down("md"),
};
