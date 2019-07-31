import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  card: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: theme.palette.primary.light,
    margin: theme.spacing(2),
    width: 340,
    minHeight: 180,
  },
  secondaryCard: {
    backgroundColor: theme.palette.secondary.dark,
    margin: 0,
    marginBottom: theme.spacing(2),
  },
  content: {
    backgroundColor: theme.palette.secondary.main,
    border: `1px solid ${theme.palette.primary.light}`,
  },
  secondaryContent: {
    backgroundColor: theme.palette.secondary.dark,
    border: 'none',
  },
  media: {
    margin: theme.spacing(2),
    paddingLeft: '35%',
    width: 0,
    height: 180,
  },
  typo: {
    color: theme.palette.primary.dark,
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
}));
