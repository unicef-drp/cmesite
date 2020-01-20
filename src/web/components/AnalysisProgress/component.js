import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { getAnalysisData } from '../../api/sdmx';
import * as R from 'ramda';
import useInterval from '../../hooks/useInterval';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import ResetIcon from '@material-ui/icons/Replay';
import withStyles from '@material-ui/core/styles/withStyles';
import Wrapper from '../Wrapper';
import WorldMap from '../Map/component';
import Loader from '../Loader';
import DataNone from '../DataNone';
import Slider from 'rc-slider'; // rc-tooltip is not working
import 'rc-slider/assets/index.css';

const DELAY = 1000;
const MARK_INTERVAL = 1;

const style = theme => ({
  wrapper: {
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 2,
  },
  typo: {
    color: theme.palette.primary.main,
  },
  button: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  toolbar: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
  slider: {
    padding: theme.spacing.unit * 4,
    paddingLeft: theme.spacing.unit * 8,
    paddingRight: theme.spacing.unit * 8,
  },
});

/*
 * 'no indicator value id' handling
 * title is an aggregation?
 * getAnalysisData to refine
 * CONSTANT for analysis: slider marks, delay, period of request...
 * styles to polish
 */

const Component = ({ classes, theme, title, description, indicatorDimension }) => {
  const indicatorValues = R.propOr([], 'values', indicatorDimension);
  const chartTypes = ['map', 'chart'];

  const [chartType, setChartType] = useState('map');
  const [indicatorValueId, setIndicatorValueId] = useState(R.prop('id', R.head(indicatorValues)));
  const [series, setSeries] = useState([]);
  const [seriesIndex, setSeriesIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const isBlank = R.isEmpty(series);
  const sliderMarks = R.pipe(
    R.splitEvery(MARK_INTERVAL),
    R.addIndex(R.reduce)(
      (memo, fragment, index) =>
        R.set(
          R.lensProp(index),
          R.pipe(R.head, R.prop('name'), name => new Date(name).getFullYear())(fragment),
          memo,
        ),
      {},
    ),
  )(series);

  useInterval(() => setSeriesIndex(R.inc(seriesIndex)), isRunning ? DELAY : null);

  useEffect(
    () => {
      //if (isNil(indicatorValueId)) return;
      console.log('useEffect');

      setSeries([]);
      setIsLoading(true);

      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();

      getAnalysisData({ indicatorValueId, source })
        .then(data => {
          console.log(data);
          setIsLoading(false);
          if (axios.isCancel()) return;
          R.pipe(R.values, R.sortBy(R.prop('name')), setSeries)(data);
        })
        .catch(error => {
          setIsLoading(false);
          if (axios.isCancel(error)) console.log('Request canceled', error.message);
          console.log(error.message);
        });

      // Trigger the abortion in useEffect's cleanup function
      return () => source.cancel('Operation canceled by the user.');
    },
    [indicatorValueId],
  );

  return (
    <Wrapper classes={{ root: classes.wrapper }}>
      <Grid spacing={32} container>
        <Grid item xs={12}>
          <Typography variant="title" className={classes.typo}>
            {title}
          </Typography>
          <Toolbar disableGutters className={classes.toolbar}>
            {R.map(
              ({ id, label }) => (
                <Button
                  size="large"
                  key={id}
                  color={R.equals(indicatorValueId, id) ? 'primary' : null}
                  classes={{ root: classes.button }}
                  onClick={() => setIndicatorValueId(id)}
                >
                  {label}
                </Button>
              ),
              indicatorValues,
            )}
          </Toolbar>
          <Divider />
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Typography variant="body2">{description}</Typography>
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          {isLoading && <Loader />}
          {!isLoading && isBlank && <DataNone />}
          {!isLoading &&
            !isBlank && (
              <React.Fragment>
                <Toolbar disableGutters variant="dense">
                  {R.map(
                    type => (
                      <Button
                        key={type}
                        size="small"
                        color={R.equals(chartType, type) ? 'primary' : null}
                        classes={{ root: classes.button }}
                        onClick={() => setChartType(type)}
                      >
                        {type}
                      </Button>
                    ),
                    chartTypes,
                  )}
                </Toolbar>
                <div className={classes.slider}>
                  <Slider
                    trackStyle={{ backgroundColor: theme.palette.primary.main }}
                    handleStyle={{ borderColor: theme.palette.primary.main }}
                    value={seriesIndex}
                    min={0}
                    max={R.dec(R.length(series))}
                    step={1}
                    onChange={setSeriesIndex}
                    marks={sliderMarks}
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
                <Toolbar disableGutters variant="dense">
                  <Typography variant="title" className={classes.typo}>
                    year
                  </Typography>
                  <Typography variant="title">#deaths</Typography>
                  <Typography variant="body2">unit</Typography>
                </Toolbar>
                {R.equals(chartType, 'map') && <WorldMap mapSerie={R.nth(seriesIndex, series)} />}
                {R.equals(chartType, 'chart') && 'chart'}
              </React.Fragment>
            )}
        </Grid>
      </Grid>
    </Wrapper>
  );
};

Component.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  indicatorDimension: PropTypes.object.isRequired,
};

export default withStyles(style, { withTheme: true })(Component);
