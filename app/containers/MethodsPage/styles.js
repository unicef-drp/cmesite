import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  wrapper: {
    backgroundColor: theme.palette.secondary.main,
  },
  root: {
    backgroundColor: theme.palette.secondary.main,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  typo: {
    color: theme.palette.primary.dark,
  },
  image: {
    width: '100%',
  },
}));
