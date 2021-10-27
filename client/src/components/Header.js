import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Container';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  header: {
    height: '80px',
    margin: '0px 80px',
    justifyContent: 'space-between',
  },
  selectBox: {
    width: '200px',
    margin: 0,
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
  },
  select: {
    margin: '0 12px',
    color: '#fff',
    '&:before': {
      borderColor: '#fff',
    },
    '&:after': {
      borderColor: '#fff',
    },
  },
  icon: {
    fil: '#fff',
  },
  loginBtn: {
    backgroundColor: '#fff',
    borderRadius: '87px',
    padding: '10px 40px',
    '&:hover': {
      backgroundColor: '#fbf3e1',
    },
  },
});

export default function Header() {
  const classes = useStyles();

  return (
    <header>
      <AppBar position='static'>
        <Toolbar className={classes.header}>
          <Box className={classes.selectBox}>
            <LocationOnRoundedIcon />
            <Select
              defaultValue={0}
              variant='standard'
              className={classes.select}
              IconComponent={() => (
                <ExpandMoreOutlinedIcon className={classes.icon} />
              )}
            >
              <MenuItem value={0}>Minsk</MenuItem>
            </Select>
          </Box>

          <Button
            variant='outlined'
            color='secondary'
            className={classes.loginBtn}
          >
            Sign in
          </Button>
        </Toolbar>
      </AppBar>
    </header>
  );
}
