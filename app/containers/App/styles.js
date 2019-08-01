import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(16),
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(7),
    },
    // sticky footer -> https://philipwalton.com/articles/normalizing-cross-browser-flexbox-bugs/
    display: 'flex',
    height: '100vh',
    flexDirection: 'column',
  },
  content: {
    backgroundColor: theme.palette.secondary.main,

    // sticky footer -> https://philipwalton.com/articles/normalizing-cross-browser-flexbox-bugs/
    flex: '1 0 auto',
  },
}));
