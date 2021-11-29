import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../../store/user/userSlice';
import LoginForm from './LoginForm';

export default function LoginContainer(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const [password, setPassword] = useState('');
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(loginUser({ email, password }));
    props.onClose();
  };

  return (
    <LoginForm
      email={email}
      handleEmailChange={handleEmailChange}
      password={password}
      handlePasswordChange={handlePasswordChange}
      handleSubmit={handleSubmit}
    />
  );
}

LoginContainer.propTypes = {
  onClose: PropTypes.func.isRequired,
};
