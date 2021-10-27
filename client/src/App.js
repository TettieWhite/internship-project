import React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.scss';

const theme = createTheme({
  palette: {
    primary: {
      main: '#66737f',
      light: '#c4c4c4',
    },
    secondary: {
      main: '#eeb955',
    },
  },
  typography: {
    fontFamily: 'Lato',
    button: {
      textTransform: 'none',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div className='main' />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
