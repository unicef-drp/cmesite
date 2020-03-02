import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { prop, isNil, always, ifElse, path, replace, converge } from 'ramda';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { REF_AREA, Z, SERIES_YEAR } from '../../constants';

const style = theme => ({
  root: {
    padding: theme.spacing.unit,
    paddingTop: 0,
    paddingBottom: 0,
    position: 'absolute',
    bottom: theme.spacing.unit * -3,
    left: '40%',
    textTransform: 'none',
    width: 360,
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing.unit * 2,
      position: 'inherit',
      left: 'inherit',
      bottom: 'inherit',
      width: 'auto',
    },
  },
  typo: {
    color: theme.palette.primary.dark,
  },
});

const formatValue = ifElse(isNil, always(null), n => numeral(n).format('0.0'));
const formatName = converge((year, name) => replace(year, '', name), [
  path([SERIES_YEAR, 'valueName']),
  path([Z, 'valueName']),
]);

const Hightlight = ({ classes, datapoint }) => {
  if (isNil(datapoint)) return null;

  return (
    <Paper className={classes.root} square>
      <Typography variant="body2" className={classes.typo}>
        <strong>{path([REF_AREA, 'valueName'], datapoint)}</strong>
      </Typography>
      <Divider />
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <Typography variant="body2" className={classes.typo}>
            <strong>{formatName(datapoint)}</strong>
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" className={classes.typo}>
            <FormattedMessage {...messages.uncertainty} />
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" className={classes.typo} inline>
            <strong>{formatValue(prop('y', datapoint))}</strong>
          </Typography>
          &nbsp;
          <Typography variant="caption" className={classes.typo} inline>
            <em>({path([SERIES_YEAR, 'valueName'], datapoint)})</em>
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" className={classes.typo}>
            ({formatValue(prop('y0', datapoint))} - {formatValue(prop('y1', datapoint))})
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
