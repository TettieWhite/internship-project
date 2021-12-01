import React, { useState } from 'react';
import PropTypes from 'prop-types';
import requestApi from '../../helpers/requestApi';
import RegisterForm from './RegisterForm';

export default function RegisterContainer(props) {
  const [email, setEmail] = useState('');
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const [password, setPassword] = useState('');
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const handleConfirmChange = (event) => {
    setPasswordConfirm(event.target.value);
  };
  const [firstName, setFirstName] = useState('');
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const [lastName, setLastName] = useState('');
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    localStorage.setItem('token', '');
    const response = requestApi('/user', 'POST', {
      email,
      password,
      passwordConfirm,
      firstName,
      lastName,
    });
    if (!response.error) {
      props.showLoginForm();
    }
  };

  return (
    <RegisterForm
      email={email}
      handleEmailChange={handleEmailChange}
      password={password}
      handlePasswordChange={handlePasswordChange}
      handleSubmit={handleSubmit}
      passwordConfirm={passwordConfirm}
      handleConfirmChange={handleConfirmChange}
      firstName={firstName}
      handleFirstNameChange={handleFirstNameChange}
      lastName={lastName}
      handleLastNameChange={handleLastNameChange}
    />
  );
}

RegisterContainer.propTypes = {
  showLoginForm: PropTypes.func.isRequired,
};
