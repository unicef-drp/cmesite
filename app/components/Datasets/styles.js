import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  wrapper: {
    backgroundColor: theme.palette.primary.main,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  list: {
    paddingTop: theme.spacing(2),
  },
  item: {
    borderRadius: 0,
  },
  typo: {
    paddingLeft: theme.spacing(2),
    textTransform: 'none',
  },
  icon: {
    color: theme.palette.secondary.main,
  },
}));
