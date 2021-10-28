import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#6D6D6D',
    color: '#fff',
    height: '105px',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  typography: {
    display: 'inline-block',
  },
  icon: {
    fill: '#fff',
  },
  social: {
    margin: 0,
    width: '136px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default useStyles;
