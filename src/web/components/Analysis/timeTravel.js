import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import ResetIcon from '@material-ui/icons/Replay';
import withStyles from '@material-ui/core/styles/withStyles';
import Slider from 'rc-slider'; // rc-tooltip is not working
import 'rc-slider/assets/index.css';
import useInterval from '../../hooks/useInterval';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit,
    overflow: 'hidden',
  },
});

const DELAY = 250;
const MARK_INTERVAL = 5;

const TimeTravel = ({ classes, theme, seriesIndex, setSeriesIndex, series }) => {
  const [isRunning, setIsRunning] = useState(false);
  const marks = useMemo(
    () =>
      R.pipe(
        R.splitEvery(MARK_INTERVAL),
        R.addIndex(R.reduce)(
          (memo, fragment, index) =>
            R.set(
              R.lensProp(index * MARK_INTERVAL),
              R.pipe(R.head, R.prop('name'), name => new Date(name).getFullYear())(fragment),
              memo,
            ),
          {},
        ),
      )(series),
    [series],
  );

  useInterval(() => {
    if (R.lt(seriesIndex, R.dec(R.length(series)))) {
      return setSeriesIndex(R.inc(seriesIndex));
    }
    setIsRunning(false);
    return;
  }, isRunning ? DELAY : null);

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Slider
          trackStyle={{ backgroundColor: theme.palette.primary.main }}
          handleStyle={{ borderColor: theme.palette.primary.main }}
          value={seriesIndex}
          min={0}
          max={R.dec(R.length(series))}
          step={1}
          onChange={setSeriesIndex}
          marks={marks}
        />
      </div>
      <Toolbar disableGutters variant="dense">
        <IconButton onClick={() => setIsRunning(true)}>
          <PlayIcon />
        </IconButton>
        <IconButton onClick={() => setIsRunning(false)}>
          <PauseIcon />
        </IconButton>
        <IconButton onClick={() => setSeriesIndex(0)}>
          <ResetIcon />
        </IconButton>
      </Toolbar>
    </React.Fragment>
  );
};

TimeTravel.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  series: PropTypes.array.isRequired,
  seriesIndex: PropTypes.number.isRequired,
  setSeriesIndex: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(TimeTravel);
