import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import React from 'react';
import useStyles from './LoginStyles';

export default function LoginForm() {
  const classes = useStyles();
  return (
    <form className={classes.form}>
      <TextField
        type='text'
        variant='outlined'
        label='Login'
        className={classes.input}
      />
      <TextField
        type='password'
        variant='outlined'
        label='Password'
        className={classes.input}
      />
      <Button type='submit' className={classes.submitBtn} variant='filled'>
        Sign in
      </Button>
    </form>
  );
}
