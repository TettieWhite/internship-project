import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Container';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import useStyles from './HeaderStyles';
import Login from './login/Login';

export default function Header() {
  const classes = useStyles();

  const [showModal, setShowModal] = React.useState(false);
  const handleOpen = () => {
    setShowModal(true);
    document.body.classList.add(classes.disable);
  };
  const handleClose = () => {
    setShowModal(false);
    document.body.classList.remove(classes.disable);
  };

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
            >
              <MenuItem value={0}>Minsk</MenuItem>
            </Select>
          </Box>

          <Button
            variant='outlined'
            color='secondary'
            className={classes.loginBtn}
            onClick={handleOpen}
          >
            Sign in
          </Button>
          <Login showModal={showModal} onClose={handleClose} />
        </Toolbar>
      </AppBar>
    </header>
  );
}
