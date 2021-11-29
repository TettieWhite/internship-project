import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './LoginStyles';

export default function LoginForm(props) {
  const classes = useStyles();
  return (
    <form className={classes.form} onSubmit={props.handleSubmit}>
      <TextField
        required
        type='text'
        variant='outlined'
        label='Email'
        className={classes.input}
        value={props.email}
        onChange={props.handleEmailChange}
      />
      <TextField
        required
        type='password'
        variant='outlined'
        label='Password'
        className={classes.input}
        value={props.password}
        onChange={props.handlePasswordChange}
      />
      <Button type='submit' className={classes.submitBtn} variant='contained'>
        Sign in
      </Button>
    </form>
  );
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  handleEmailChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
};
