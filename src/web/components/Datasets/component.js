import React from 'react';
import PropTypes from 'prop-types';
import { map, prop } from 'ramda';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DescriptionIcon from '@material-ui/icons/Description';
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

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

const Datasets = ({ classes, title, updatedAt, datasets }) => (
  <div className={classes.wrapper}>
    <Typography variant="display1" color="secondary" align="center">
      {title}
    </Typography>
    <Typography variant="body2" color="secondary" align="center">
      {updatedAt}
    </Typography>
    <List className={classes.list} dense>
      {map(({ id, name, description }) => (
        <ListItem key={id} button className={classes.item}>
          <ListItemIcon>
            <DescriptionIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText
            primary={`${name}: ${description}`}
            primaryTypographyProps={{ color: 'secondary' }}
          />
        </ListItem>
      ))(datasets)}
    </List>
  </div>
);

Datasets.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  updatedAt: PropTypes.string,
  datasets: PropTypes.array,
};

Datasets.defaultProps = {
  datasets: [],
};

export default withStyles(style)(Datasets);
