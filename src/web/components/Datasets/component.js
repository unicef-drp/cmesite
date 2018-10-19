import React from 'react';
import PropTypes from 'prop-types';
import { map, path, isNil } from 'ramda';
import { format } from 'date-fns';
import Typography from '@material-ui/core/Typography';
import DescriptionIcon from '@material-ui/icons/Description';
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const style = theme => ({
  wrapper: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing.unit * 4,
    paddingLeft: theme.spacing.unit * 12,
    paddingRight: theme.spacing.unit * 12,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
    },
  },
  list: {
    paddingTop: theme.spacing.unit * 2,
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  item: {
    width: 500,
    [theme.breakpoints.only('md')]: {
      width: 360,
    },
    [theme.breakpoints.only('sm')]: {
      width: 500,
    },
    [theme.breakpoints.only('xs')]: {
      width: 360,
    },
  },
  icon: {
    color: theme.palette.secondary.main,
  },
});

const Datasets = ({ classes, updatedAt, datasets }) => (
  <div className={classes.wrapper}>
    <Typography variant="headline" color="secondary" align="center">
      <FormattedMessage {...messages.title} />
    </Typography>
    <Typography variant="body2" color="secondary" align="center">
      <FormattedMessage {...messages.updatedAt} />
      {' - '}
      {format(updatedAt, 'DD MMMM YYYY', { locale: 'en' })}
    </Typography>
    <List className={classes.list} dense>
      {map(dataset => {
        const file = path(['acf', 'file'])(dataset);
        if (isNil(file)) return null;
        return (
          <ListItem
            key={dataset.id}
            button
            component="a"
            className={classes.item}
            target="_blank"
            href={dataset.acf.file.url}
            download
          >
            <ListItemIcon>
              <DescriptionIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText
              primary={`${path(['title', 'rendered'])(dataset)}: ${
                dataset.acf.file.description
              }`}
              primaryTypographyProps={{ color: 'secondary' }}
            />
          </ListItem>
        );
      })(datasets)}
    </List>
  </div>
);

Datasets.propTypes = {
  classes: PropTypes.object.isRequired,
  updatedAt: PropTypes.string,
  datasets: PropTypes.array,
};

Datasets.defaultProps = {
  datasets: [],
};

export default withStyles(style)(Datasets);
