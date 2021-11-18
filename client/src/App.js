import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ThemeProvider } from '@material-ui/core';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.scss';
import { userActions } from './store/user/userSlice';
import requestApi from './helpers/requestApi';
import theme from './theme';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthdHJpbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI2MTcwNGFjMjBjMjViYTRmOGYyZDNjYzQiLCJpYXQiOjE2MzcyMzE4NzUsImV4cCI6MTYzNzIzNTQ3NX0.vodzIflLkypHM67_xwgZxzEbH-HE_Cu-4ua19PJx-hk'
    );
    const fetchUserData = async () => {
      const response = await requestApi('/user/me', 'POST');
      if (!response.error) {
        dispatch(
          userActions.setAuth({
            isAuth: true,
          })
        );
        dispatch(
          userActions.setUser({
            id: response.data._id,
            email: response.data.email,
            role: response.data.role,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            preferences: {
              cityId: response.data.preferences.cityId,
            },
          })
        );
      } else {
        dispatch(
          userActions.setAuth({
            isAuth: false,
          })
        );
      }
    };
    fetchUserData();
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
