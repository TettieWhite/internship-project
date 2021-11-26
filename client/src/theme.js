import { createTheme } from '@material-ui/core';

const theme = createTheme({
  palette: {
    primary: {
      main: '#66737f',
      light: '#c4c4c4',
    },
    secondary: {
      main: '#eeb955',
      dark: '#E5B04C',
    },
  },
  typography: {
    fontFamily: 'Lato',
    button: {
      textTransform: 'none',
    },
  },
});

export default theme;
