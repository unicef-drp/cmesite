import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { map, equals } from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const styles = theme => ({
  header: {
    //backgroundColor: theme.palette.secondary.dark,
    paddingBottom: 0,
  },
  typo: {
    color: theme.palette.primary.dark,
  },
  btn: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  unselected: {
    color: theme.palette.secondary.darker,
  },
});

const DataHeader = ({ classes, title, mode, changeMode, isCompare }) => (
  <CardHeader
    className={classes.header}
    title={
      <React.Fragment>
        <Typography align="center" variant="title" className={classes.typo}>
          {title}
        </Typography>
        {!isCompare && (
          <React.Fragment>
            <Grid container justify="center">
              <Grid item>
                {map(m => (
                  <Button
                    className={classnames(classes.btn, { [classes.unselected]: !equals(m, mode) })}
                    key={m}
                    size="small"
                    onClick={() => changeMode(m)}
                    color={equals(m, mode) ? 'primary' : 'default'}
                  >
                    <FormattedMessage {...messages[m]} />
                  </Button>
                ))(['chart', 'estimates', 'datasources'])}
              </Grid>
            </Grid>
          </React.Fragment>
        )}
      </React.Fragment>
    }
  />
);

DataHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  mode: PropTypes.string,
  changeMode: PropTypes.func,
  isCompare: PropTypes.bool,
};

export default withStyles(styles)(DataHeader);
