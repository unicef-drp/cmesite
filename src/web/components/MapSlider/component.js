import React from 'react';
import PropTypes from 'prop-types';
import { dec, length, flip, nth, prop, pipe } from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from 'rc-slider'; // rc-tooltip is not working
import 'rc-slider/assets/index.css';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const styles = theme => ({
  wrapper: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    display: 'flex',
    alignItems: 'center',
  },
  slider: {
    padding: theme.spacing.unit * 2,
    width: '100%',
  },
  typo: {
    color: theme.palette.primary.dark,
    fontWeight: 600,
    whiteSpace: 'nowrap',
  },
});

const getLabel = mapSeries =>
  pipe(flip(nth)(mapSeries), prop('name'), name => new Date(name).getFullYear());

const Component = ({ classes, theme, value, mapSeries, changeMapIndex, onChangeValue }) => (
  <div className={classes.wrapper}>
    <Typography variant="body2" className={classes.typo}>
      <FormattedMessage {...messages.title} />
    </Typography>
    <div className={classes.slider}>
      <Slider
        trackStyle={{ backgroundColor: theme.palette.primary.main }}
        handleStyle={{ borderColor: theme.palette.primary.main }}
        value={value}
        min={0}
        max={dec(length(mapSeries))}
        step={1}
        onChange={onChangeValue}
        onAfterChange={changeMapIndex}
      />
    </div>
    <Typography variant="body2" className={classes.typo}>
      {getLabel(mapSeries)(value)}
    </Typography>
  </div>
);

Component.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  mapSeries: PropTypes.array.isRequired,
  value: PropTypes.number,
  changeMapIndex: PropTypes.func.isRequired,
  onChangeValue: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(Component);
