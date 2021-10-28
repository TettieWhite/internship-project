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
    '& .MuiSvgIcon-root': {
      color: '#fff',
    },
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

export default useStyles;
