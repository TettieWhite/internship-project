import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import React from 'react';
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
        value={props.login}
        onChange={props.handleLoginChange}
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
      <Button type='submit' className={classes.submitBtn} variant='filled'>
        Sign in
      </Button>
    </form>
  );
}
