import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TelegramIcon from '@material-ui/icons/Telegram';
import useStyles from './FooterStyles';

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container className={classes.container}>
        <Typography className={classes.typography}>
          2021 © ITechArt, All Rights Reserved.
        </Typography>
        <Box className={classes.social}>
          <IconButton>
            <FacebookIcon className={classes.icon} />
          </IconButton>
          <IconButton>
            <InstagramIcon className={classes.icon} />
          </IconButton>
          <IconButton>
            <TelegramIcon className={classes.icon} />
          </IconButton>
        </Box>
      </Container>
    </footer>
  );
}
