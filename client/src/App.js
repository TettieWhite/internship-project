import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ThemeProvider } from '@material-ui/core';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.scss';
import { fetchUserData } from './store/user/userSlice';
import theme from './theme';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div className='main' />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
