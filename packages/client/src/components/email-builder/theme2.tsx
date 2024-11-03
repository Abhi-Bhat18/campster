'use client'
import { createTheme, alpha, darken, lighten } from "@mui/material/styles";

const BASE_THEME = createTheme({
  palette: {
    background: {
      default: "hsl(0, 0%, 100%)", // --background in light mode
      paper: "hsl(0, 0%, 100%)", // --card in light mode
    },
    text: {
      primary: "hsl(240, 10%, 3.9%)", // --foreground in light mode
      secondary: "hsl(240, 5.9%, 10%)", // --primary in light mode
    },
    primary: {
      main: "hsl(240, 5.9%, 10%)", // --primary in light mode
      contrastText: "hsl(0, 0%, 98%)", // --primary-foreground in light mode
    },
    secondary: {
      main: "hsl(240, 4.8%, 95.9%)", // --secondary in light mode
      contrastText: "hsl(240, 5.9%, 10%)", // --secondary-foreground in light mode
    },
    error: {
      main: "hsl(0, 84.2%, 60.2%)", // --destructive in light mode
      contrastText: "hsl(0, 0%, 98%)", // --destructive-foreground in light mode
    },
    divider: "hsl(240, 5.9%, 90%)", // --border
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  shape: {
    borderRadius: 12, // --radius
  },
});

const DARK_THEME = createTheme(BASE_THEME, {
  palette: {
    mode: "dark",
    background: {
      default: "hsl(20, 14.3%, 4.1%)", // --background in dark mode
      paper: "hsl(24, 9.8%, 10%)", // --card in dark mode
    },
    text: {
      primary: "hsl(0, 0%, 95%)", // --foreground in dark mode
      secondary: "hsl(142.1, 70.6%, 45.3%)", // --primary in dark mode
    },
    primary: {
      main: "hsl(142.1, 70.6%, 45.3%)", // --primary in dark mode
      contrastText: "hsl(144.9, 80.4%, 10%)", // --primary-foreground in dark mode
    },
    secondary: {
      main: "hsl(240, 3.7%, 15.9%)", // --secondary in dark mode
      contrastText: "hsl(0, 0%, 98%)", // --secondary-foreground in dark mode
    },
    error: {
      main: "hsl(0, 62.8%, 30.6%)", // --destructive in dark mode
      contrastText: "hsl(0, 85.7%, 97.3%)", // --destructive-foreground in dark mode
    },
    divider: "hsl(240, 3.7%, 15.9%)", // --border in dark mode
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "0.5rem", // --radius
          backgroundColor: "hsl(240, 5.9%, 10%)", // Map your primary color
          color: "hsl(0, 0%, 98%)", // Primary foreground
        },
        contained: {
          "&:hover": {
            backgroundColor: darken("hsl(240, 5.9%, 10%)", 0.2), // Darken on hover
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "hsl(0, 0%, 100%)", // --card
          color: "hsl(240, 10%, 3.9%)", // --card-foreground
        },
      },
    },
  },
});

export { BASE_THEME, DARK_THEME };
