import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import React, { useState } from 'react';
import useStyles from './LoginStyles';
import LoginContainer from './LoginContainer';
import RegisterContainer from './RegisterContainer';

export default function Login(props) {
  const classes = useStyles();

  const [isLoginOpened, showLoginForm] = useState(true);
  const showLogin = () => {
    showLoginForm(true);
  };
  const showRegister = () => {
    showLoginForm(false);
  };
  if (!props.show) {
    return null;
  }
  return (
    <Box className={classes.overlay}>
      <Container className={classes.modal}>
        <Box className={classes.bg}>
          <Button
            onClick={showLogin}
            className={`${classes.btn} ${isLoginOpened ? classes.active : ''}`}
          >
            Sign in
          </Button>
          <Button
            onClick={showRegister}
            className={`${classes.btn} ${!isLoginOpened ? classes.active : ''}`}
          >
            Sign up
          </Button>
          <IconButton onClick={props.onClose}>
            <CloseRoundedIcon className={classes.close} />
          </IconButton>
        </Box>
        {isLoginOpened ? (
          <LoginContainer onClose={props.onClose} />
        ) : (
          <RegisterContainer showLogin={showLogin} />
        )}
      </Container>
    </Box>
  );
}
