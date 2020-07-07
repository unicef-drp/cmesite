import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { prop, isNil, path, none } from 'ramda';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { getFormatMapYear, getDefaultFormatValue } from '../../lib/formatters';
import { REF_AREA, REF_DATE } from '../../constants';

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

const Hightlight = ({ classes, datapoint, hasDetails, hasRefDate = true, name, valueName }) => {
  if (isNil(datapoint)) return null;

  const y0 = prop('y0', datapoint);
  const y1 = prop('y1', datapoint);
  const hasUncertainty = none(isNaN, [y0, y1]);

  return (
    <Paper className={classes.root} square>
      <Typography variant="body2" className={classes.typo}>
        <strong>{path([REF_AREA, 'valueName'], datapoint)}</strong>
      </Typography>
      <Divider />
      <Grid container spacing={0}>
        <Grid item xs={hasUncertainty ? 6 : 12}>
          <Typography variant="body2" className={classes.typo}>
            <strong>{name}</strong>
          </Typography>
        </Grid>
        {hasUncertainty && (
          <Grid item xs={6}>
            <Typography variant="body2" className={classes.typo}>
              <FormattedMessage {...messages.uncertainty} />
            </Typography>
          </Grid>
        )}
        <Grid item xs={hasUncertainty ? 6 : 12}>
          <Typography variant="body2" className={classes.typo} inline>
            <strong>{valueName}</strong>
          </Typography>
          &nbsp;
          {hasRefDate && (
            <Typography variant="caption" className={classes.typo} inline>
              <em>({getFormatMapYear(path([REF_DATE, 'valueName'], datapoint))})</em>
            </Typography>
          )}
        </Grid>
        {hasUncertainty && (
          <Grid item xs={6}>
            <Typography variant="body2" className={classes.typo}>
              ({getDefaultFormatValue(y0)} - {getDefaultFormatValue(y1)})
            </Typography>
          </Grid>
        )}
      </Grid>
      {hasDetails && (
        <Typography variant="caption">
          <FormattedMessage {...messages.countryDetails} />
        </Typography>
      )}
    </Paper>
  );
};

Hightlight.propTypes = {
  classes: PropTypes.object.isRequired,
  datapoint: PropTypes.object,
  hasDetails: PropTypes.bool,
  hasRefDate: PropTypes.bool,
  name: PropTypes.string,
  valueName: PropTypes.string,
};

export default withStyles(style)(Hightlight);
