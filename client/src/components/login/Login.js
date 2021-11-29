import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useStyles from './LoginStyles';
import LoginContainer from './LoginContainer';
import RegisterContainer from './RegisterContainer';

export default function Login(props) {
  const classes = useStyles();

  const [showLogin, setShowLogin] = useState(true);
  const showLoginForm = () => {
    setShowLogin(true);
  };
  const showRegisterForm = () => {
    setShowLogin(false);
  };

  const active = showLogin && classes.active;
  const regActive = !showLogin && classes.active;
  const loginBtnClasses = classNames(classes.btn, active);
  const regBtnClasses = classNames(classes.btn, regActive);
  if (!props.showModal) {
    return null;
  }
  return (
    <Box className={classes.overlay}>
      <Container className={classes.modal}>
        <Box className={classes.bg}>
          <Button onClick={showLoginForm} className={loginBtnClasses}>
            Sign in
          </Button>
          <Button onClick={showRegisterForm} className={regBtnClasses}>
            Sign up
          </Button>
          <IconButton onClick={props.onClose}>
            <CloseRoundedIcon className={classes.close} />
          </IconButton>
        </Box>
        {showLogin ? (
          <LoginContainer onClose={props.onClose} />
        ) : (
          <RegisterContainer showLoginForm={showLoginForm} />
        )}
      </Container>
    </Box>
  );
}

Login.propTypes = {
  showModal: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
