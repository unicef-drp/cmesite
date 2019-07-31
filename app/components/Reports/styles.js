import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  reports: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  wrapper: {
    backgroundColor: theme.palette.secondary.main,
  },
  secondaryWrapper: {
    backgroundColor: theme.palette.secondary.dark,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
}));
