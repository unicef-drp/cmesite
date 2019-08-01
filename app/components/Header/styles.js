import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  toolbar: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
  logo: {
    height: 30,
    paddingRight: theme.spacing(2),
  },
  typo: {
    color: theme.palette.primary.dark,
  },
  titlebar: {
    backgroundColor: theme.palette.secondary.main,
  },
  menubar: {
    top: theme.spacing(8),
  },
  selectedMenu: {
    border: `1px solid ${theme.palette.secondary.main}`,
    color: `${theme.palette.secondary.main}!important`,
  },
  menu: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));
