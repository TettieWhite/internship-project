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
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthdHJpbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI2MTcwNGFjMjBjMjViYTRmOGYyZDNjYzQiLCJpYXQiOjE2MzczMjU5NzQsImV4cCI6MTYzNzMyOTU3NH0.ZCFmtmPxS2EAVT3389nIt-P5kbkxU385TtSibVt2R74'
    );
    dispatch(fetchUserData());
  });

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div className='main' />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
