import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  wrapper: {
    backgroundColor: theme.palette.secondary.main,
    marginTop: theme.spacing(-6),
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    height: `calc(100% + ${theme.spacing(6)}px)`,
  },
  container: {
    paddingTop: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'space-around',
    },
  },
  card: {
    borderRadius: 0,
    background: 'none',
    padding: 0,
    [theme.breakpoints.down('sm')]: {
      width: 320,
      paddingTop: 0,
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  },
  media: {
    [theme.breakpoints.up('md')]: {
      paddingTop: '56.5%',
      height: 0,
    },
    [theme.breakpoints.down('sm')]: {
      height: 160,
    },
  },
  content: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  typo: {
    color: theme.palette.primary.dark,
  },
}));
