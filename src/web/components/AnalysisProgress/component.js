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
import { UNIT_MEASURE } from '../../constants';
import Slider from 'rc-slider'; // rc-tooltip is not working
import 'rc-slider/assets/index.css';

const DELAY = 250;
const MARK_INTERVAL = 5;
const START_PERIOD = 1990;
const END_PERIOD = 2019;

const style = theme => ({
  wrapper: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  typo: {
    color: theme.palette.primary.main,
  },
  name: {
    color: theme.palette.secondary.darker,
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
  info: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'flex-end',
  },
  slider: {
    padding: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit,
  },
});

/*
 * getAnalysisData to refine
 * CONSTANT for analysis: slider marks, delay, period of request...
 * bug size aware component??
 */

const Component = ({ classes, theme, /*title,*/ description, indicatorDimension }) => {
  const indicatorValues = R.propOr([], 'values', indicatorDimension);
  const chartTypes = ['map', 'chart'];

  const [chartType, setChartType] = useState('map');
  const [indicatorValueId, setIndicatorValueId] = useState(R.prop('id', R.head(indicatorValues)));
  const [series, setSeries] = useState([]);
  const [seriesIndex, setSeriesIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const isBlank = R.isEmpty(series);
  const serie = R.nth(seriesIndex, series);
  const average = R.pipe(R.propOr([], 'datapoints'), R.values, R.pluck('y'), R.mean)(serie);
  const sliderMarks = R.pipe(
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
  )(series);

  useInterval(() => {
    if (R.lt(seriesIndex, R.dec(R.length(series)))) {
      return setSeriesIndex(R.inc(seriesIndex));
    }
    setIsRunning(false);
    return;
  }, isRunning ? DELAY : null);

  useEffect(
    () => {
      if (R.isNil(indicatorValueId)) return;

      setIsLoading(true);
      setSeries([]);

      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();

      getAnalysisData({
        indicatorValueId,
        source,
        startPeriod: START_PERIOD,
        endPeriod: END_PERIOD,
      })
        .then(({ series }) => {
          setIsLoading(false);
          if (axios.isCancel()) return;
          R.pipe(R.values, R.sortBy(R.prop('name')), setSeries)(series);
        })
        .catch(error => {
          setIsLoading(false);
          // eslint-disable-next-line no-console
          if (axios.isCancel(error)) console.log('Request canceled');
          console.log(error.message); // eslint-disable-line no-console
        });

      // Trigger the abortion in useEffect's cleanup function
      return () => source.cancel();
    },
    [indicatorValueId],
  );

  return (
    <Wrapper classes={{ root: classes.wrapper }}>
      <Grid spacing={32} container>
        <Grid item xs={12}>
          {/*<Typography variant="title" className={classes.typo}>
            {title}
          </Typography>*/}
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
          <Typography variant="body2" align="justify">
            {description}
          </Typography>
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          {isLoading && <Loader />}
          {!isLoading && isBlank && <DataNone />}
          {!isLoading &&
            !isBlank && (
              <React.Fragment>
                <Toolbar disableGutters variant="dense" style={{ marginTop: -12 }}>
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
                <div className={classes.info}>
                  <Typography variant="title" className={classes.name}>
                    {new Date(R.prop('name', serie)).getFullYear()},&nbsp;
                  </Typography>
                  <Typography variant="title" className={classes.typo}>
                    {Math.round(average)}&nbsp;
                  </Typography>
                  <Typography variant="body2">{R.prop(UNIT_MEASURE, serie)}</Typography>
                </div>
                {R.equals(chartType, 'map') && <WorldMap mapSerie={serie} />}
                {R.equals(chartType, 'map') && 'chart'}
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
