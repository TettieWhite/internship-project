import React, { useState } from 'react';
import requestApi from '../../helpers/requestApi';
import RegisterForm from './RegisterForm';

export default function RegisterContainer(props) {
  const [loginInputState, changeLogin] = useState('');
  const handleLoginChange = (event) => {
    changeLogin(event.target.value);
  };
  const [passwordInputState, changePassword] = useState('');
  const handlePasswordChange = (event) => {
    changePassword(event.target.value);
  };
  const [confirmInputState, changeConfirm] = useState('');
  const handleConfirmChange = (event) => {
    changeConfirm(event.target.value);
  };
  const [firstNameInputState, changeFirstName] = useState('');
  const handleFirstNameChange = (event) => {
    changeFirstName(event.target.value);
  };
  const [lastNameInputState, changeLastName] = useState('');
  const handleLastNameChange = (event) => {
    changeLastName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    localStorage.setItem('token', '');
    const response = requestApi('/user', 'POST', {
      email: loginInputState,
      password: passwordInputState,
      passwordConfirm: confirmInputState,
      firstName: firstNameInputState,
      lastName: lastNameInputState,
    });
    if (!response.error) {
      props.showLogin();
    }
  };

  return (
    <RegisterForm
      login={loginInputState}
      handleLoginChange={handleLoginChange}
      password={passwordInputState}
      handlePasswordChange={handlePasswordChange}
      handleSubmit={handleSubmit}
      passwordConfirm={confirmInputState}
      handleConfirmChange={handleConfirmChange}
      firstName={firstNameInputState}
      handleFirstNameChange={handleFirstNameChange}
      lastName={lastNameInputState}
      handleLastNameChange={handleLastNameChange}
    />
  );
}
