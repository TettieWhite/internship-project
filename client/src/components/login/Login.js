import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import React from 'react';
import useStyles from './LoginStyles';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function Login(props) {
  const classes = useStyles();

  const [isLoginOpened, showLoginForm] = React.useState(true);
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
        {isLoginOpened ? <LoginForm /> : <RegisterForm />}
      </Container>
    </Box>
  );
}
