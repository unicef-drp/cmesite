import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  splash: {
    height: 350,
    backgroundSize: 'cover !important',
    background: ({ url }) => `${theme.palette.primary.main} url("${url}") repeat center`,
  },
  wrapper: {
    height: 350,
  },
  content: {
    marginTop: theme.spacing(-8),
  },
}));
