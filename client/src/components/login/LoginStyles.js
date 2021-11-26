import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  overlay: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.8)',
  },
  modal: {
    position: 'absolute',
    top: '148px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '410px',
    minHeight: '460px',
    padding: '0',
    backgroundImage:
      'url("https://oboimir.ru/upload/iblock/740/7405cf527937cc3325971c2781a2eff0.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '5px',
    zIndex: '1',
  },
  bg: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 21px',
    height: '96px',
    background: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '5px 5px 0px 0px',
  },
  btn: {
    fontFamily: 'Rokkit',
    fontSize: '42px',
    fontWeight: '700',
  },
  active: {
    color: theme.palette.secondary.main,
    textDecoration: 'underline',
  },
  close: {
    fill: '#000',
    width: '48px',
    height: '48px',
  },
  form: {
    margin: '65px 50px',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& *': {
      color: 'white',
    },
    '& > *': {
      marginTop: '30px',
    },
  },
  input: {
    width: '100%',
    '& > div': {
      background: 'rgba(0, 0, 0, 0.7)',
    },
    '& fieldset': {
      borderColor: 'black',
    },
    '& label.Mui-focused': {
      color: 'white',
    },
  },
  submitBtn: {
    padding: '8px 46px',
    background: `${theme.palette.secondary.main}`,
    borderRadius: '87px',
    filter:
      'drop-shadow(0px 1px 18px rgba(0, 0, 0, 0.12)) drop-shadow(0px 3px 5px rgba(0, 0, 0, 0.2))',
    '&:hover': {
      filter: 'drop-shadow(0px 6px 10px rgba(0, 0, 0, 0.14)) ',
      background: `${theme.palette.secondary.dark}`,
    },
  },
}));

export default useStyles;
