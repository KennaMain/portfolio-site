import { createTheme } from '@mui/material/styles';

// Define your custom theme
const createCustomTheme = (mode: 'light' | 'dark' = 'light') => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#2D2E2A',
      },
      secondary: {
        light: '#FFFBDD',
        main: '#C1C1AC',
      },
      background: {
        default: mode === 'light' ? '#FFFBDD' : '#FFFBDD',
        paper: mode === 'light' ? '#2D2E2A': '#2D2E2A',
      },
    },
    typography: {
      //fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontFamily: '"Erbaum"',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 600,
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 600,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
    },
  });
};

export default createCustomTheme;