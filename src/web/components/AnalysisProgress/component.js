import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { getAnalysisData } from '../../api/sdmx';
import { map, propOr, equals, prop, head, isNil } from 'ramda';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import withStyles from '@material-ui/core/styles/withStyles';
import Wrapper from '../Wrapper';
import WorldMap from '../Map/component';

const style = theme => ({
  wrapper: {
    paddingTop: theme.spacing.unit * 4,
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
});

const Component = ({ classes, title, description, indicatorDimension }) => {
  const indicatorValues = propOr([], 'values', indicatorDimension);
  const chartTypes = ['map', 'chart'];

  const [chartType, setChartType] = useState('map');
  const [indicatorValueId, setIndicatorValueId] = useState(prop('id', head(indicatorValues)));
  const [data, setData] = useState(null);

  useEffect(
    () => {
      console.log(indicatorValueId);
      //if (isNil(indicatorValueId)) return;

      setData(null);

      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();

      getAnalysisData({ indicatorValueId, source })
        .then(data => {
          console.log(data);
          if (axios.isCancel()) return;
          setData(data);
        })
        .catch(error => {
          if (axios.isCancel(error)) console.log('Request canceled', error.message);
          console.log(error.message);
        });

      // Trigger the abortion in useEffect's cleanup function
      return () => source.cancel('Operation canceled by the user.');
    },
    [indicatorValueId],
  );

  console.log('render');

  return (
    <Wrapper classes={{ root: classes.wrapper }}>
      <Grid spacing={32} container>
        <Grid item xs={12}>
          <Typography variant="title" className={classes.typo}>
            {title}
          </Typography>
          <Toolbar disableGutters className={classes.toolbar}>
            {map(
              ({ id, label }) => (
                <Button
                  size="large"
                  key={id}
                  color={equals(indicatorValueId, id) ? 'primary' : null}
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
          <Typography variant="body2" paragraph>
            {description}
          </Typography>
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          {map(
            type => (
              <Button
                key={type}
                size="small"
                color={equals(chartType, type) ? 'primary' : null}
                classes={{ root: classes.button }}
                onClick={() => setChartType(type)}
              >
                {type}
              </Button>
            ),
            chartTypes,
          )}
          {equals(chartType, 'map') && <WorldMap mapSerie={data} />}
          {equals(chartType, 'chart') && 'chart'}
        </Grid>
      </Grid>
    </Wrapper>
  );
};

Component.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  indicatorDimension: PropTypes.object.isRequired,
};

export default withStyles(style)(Component);
