import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { prop, isNil, always, ifElse, path } from 'ramda';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { REF_AREA } from '../../constants';

const style = theme => ({
  root: {
    padding: theme.spacing.unit,
    paddingTop: 0,
    paddingBottom: 0,
    position: 'absolute',
    bottom: theme.spacing.unit * -3,
    left: '40%',
    textTransform: 'none',
  },
  typo: {
    color: theme.palette.primary.dark,
  },
});

const format = ifElse(isNil, always(null), n => numeral(n).format('0.00'));

const Hightlight = ({ classes, datapoint }) => {
  if (isNil(datapoint)) return null;

  return (
    <Paper className={classes.root} square>
      <Typography variant="body2" className={classes.typo}>
        <strong>{path([REF_AREA, 'valueName'], datapoint)}</strong>
      </Typography>
      <Divider />
      <Grid container spacing={0}>
        <Grid item xs={4}>
          <Typography variant="body2" className={classes.typo}>
            {format(prop('y0', datapoint))}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body2" className={classes.typo}>
            <strong>{format(prop('y', datapoint))}</strong>
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body2" className={classes.typo}>
            {format(prop('y1', datapoint))}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body2" className={classes.typo}>
            <FormattedMessage {...messages.lower} />
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body2" className={classes.typo}>
            <strong>
              <FormattedMessage {...messages.estimate} />
            </strong>
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body2" className={classes.typo}>
            <FormattedMessage {...messages.upper} />
          </Typography>
        </Grid>
      </Grid>
      <Typography variant="caption">
        <FormattedMessage {...messages.countryDetails} />
      </Typography>
    </Paper>
  );
};

Hightlight.propTypes = {
  classes: PropTypes.object.isRequired,
  datapoint: PropTypes.object,
};

export default withStyles(style)(Hightlight);
