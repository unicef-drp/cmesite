import React from 'react';
import PropTypes from 'prop-types';
import { map, prop } from 'ramda';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DescriptionIcon from '@material-ui/icons/Description';
import withStyles from '@material-ui/core/styles/withStyles';

const datasetsStyle = theme => ({
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
  datasets: {
    paddingTop: theme.spacing.unit * 2,
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  button: {
    color: theme.palette.common.white,
    textTransform: 'none',
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
    <div className={classes.datasets}>
      {map(({ id, name, description }) => (
        <div key={id}>
          <Button color="inherit" size="small" className={classes.button}>
            <DescriptionIcon
              className={classNames(classes.leftIcon, classes.iconSmall)}
            />
            <Typography variant="caption" color="secondary" align="left">
              {name}:&nbsp;{description}
            </Typography>
          </Button>
        </div>
      ))(datasets)}
    </div>
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

export default withStyles(datasetsStyle)(Datasets);
