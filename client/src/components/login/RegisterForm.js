import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './LoginStyles';

export default function RegisterForm(props) {
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
      <TextField
        required
        type='password'
        variant='outlined'
        label='Password Confirmation'
        className={classes.input}
        value={props.passwordConfirm}
        onChange={props.handleConfirmChange}
      />
      <TextField
        required
        type='text'
        variant='outlined'
        label='First name'
        className={classes.input}
        value={props.firstName}
        onChange={props.handleFirstNameChange}
      />
      <TextField
        required
        type='text'
        variant='outlined'
        label='Last name'
        className={classes.input}
        value={props.lastName}
        onChange={props.handleLastNameChange}
      />
      <Button type='submit' className={classes.submitBtn} variant='contained'>
        Sign up
      </Button>
    </form>
  );
}

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  handleEmailChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  passwordConfirm: PropTypes.string.isRequired,
  handleConfirmChange: PropTypes.func.isRequired,
  firstName: PropTypes.string.isRequired,
  handleFirstNameChange: PropTypes.func.isRequired,
  lastName: PropTypes.string.isRequired,
  handleLastNameChange: PropTypes.func.isRequired,
};
