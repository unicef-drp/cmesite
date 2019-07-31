import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  wrapper: {
    backgroundColor: theme.palette.secondary.dark,
  },
  splash: {
    height: 350,
  },
  about: {
    backgroundColor: theme.palette.secondary.main,
    marginTop: theme.spacing(-2),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  typo: {
    color: theme.palette.primary.dark,
  },
  title: {
    color: theme.palette.primary.dark,
    marginBottom: theme.spacing(4),
  },
  section: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(2),
  },
  logos: {
    border: `1px solid ${theme.palette.primary.light}`,
    borderLeft: 0,
    borderRight: 0,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    paddingLeft: 0,
    paddingRight: 0,
  },
  logo: {
    height: 60,
    margin: theme.spacing(1),
  },
  focus: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 150,
  },
  focusLogo: {
    width: 100,
  },
  action: {
    padding: theme.spacing(2),
    paddingTop: 0,
    paddingBottom: 0,
  },
  titleWrapper: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));
