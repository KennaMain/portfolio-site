
export const theme = {
  shape: {
    borderRadius: 2
  },
  palette: {
    common: {
      white: '#fff',
      black: '#000'
    },
    primary: {
      main: '#2D2E2A',
    },
    secondary: {
      light: '#FFFBDD',
      main: '#C1C1AC',
    },
    background: {
      default: '#FFFBDD',
      paper: '#2D2E2A'
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
}