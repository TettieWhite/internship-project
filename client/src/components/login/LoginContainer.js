import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/user/userSlice';
import LoginForm from './LoginForm';

export default function LoginContainer(props) {
  const dispatch = useDispatch();
  const [loginInputState, changeLogin] = useState('');
  const handleLoginChange = (event) => {
    changeLogin(event.target.value);
  };
  const [passwordInputState, changePassword] = useState('');
  const handlePasswordChange = (event) => {
    changePassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(
      loginUser({ email: loginInputState, password: passwordInputState })
    );
    props.onClose();
  };

  return (
    <LoginForm
      login={loginInputState}
      handleLoginChange={handleLoginChange}
      password={passwordInputState}
      handlePasswordChange={handlePasswordChange}
      handleSubmit={handleSubmit}
    />
  );
}
