import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import withStyles from '@material-ui/core/styles/withStyles';
import { FormattedMessage } from 'react-intl';
import Wrapper from '../Wrapper';
import Loader from '../Loader';
import DataNone from '../DataNone';
import WorldMap from '../Map/component';
import Toolbar from './toolbar';
import TimeTravel from './timeTravel';
import VizSwitch from './vizSwitch';
import useSeries from './useSeries';
import { UNIT_MEASURE, VIZ_MAP } from '../../constants';
import messages from '../../pages/Analysis/messages';

const styles = theme => ({
  wrapper: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  title: {
    color: theme.palette.primary.main,
  },
  info: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'flex-end',
  },
  infoDate: {
    color: theme.palette.secondary.darker,
  },
});

const MEAN_ID = 'WORLD';

const Analysis = ({ classes, type, description, indicatorValues, vizTypes, isActive }) => {
  const [indicatorValueId, setIndicatorValueId] = useState(R.prop('id', R.head(indicatorValues)));
  const [seriesIndex, setSeriesIndex] = useState(0);
  const [isLoading, series] = useSeries(indicatorValueId, isActive);
  const [vizType, setVizType] = useState(VIZ_MAP);

  const isBlank = R.isEmpty(series);
  const serie = R.nth(seriesIndex, series);
  const mean = R.path(['datapoints', MEAN_ID, 'y'])(serie);
  const needSwitch = R.gt(R.length(vizTypes), 1);

  return (
    <Wrapper classes={{ root: classes.wrapper }}>
      <Grid spacing={32} container>
        <Grid item xs={12}>
          <Typography variant="title" className={classes.title}>
            <FormattedMessage {...messages[type]} />
          </Typography>
          <Toolbar
            values={indicatorValues}
            valueId={indicatorValueId}
            setValueId={setIndicatorValueId}
          />
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
                {needSwitch && <VizSwitch types={vizTypes} type={vizType} setType={setVizType} />}
                <TimeTravel
                  series={series}
                  seriesIndex={seriesIndex}
                  setSeriesIndex={setSeriesIndex}
                />
                <div className={classes.info}>
                  <Typography variant="title" className={classes.infoDate}>
                    {new Date(R.prop('name', serie)).getFullYear()},&nbsp;
                  </Typography>
                  <Typography variant="title" className={classes.title}>
                    {Math.round(mean)}&nbsp;
                  </Typography>
                  <Typography variant="body2">{R.prop(UNIT_MEASURE, serie)}</Typography>
                </div>
                {R.equals(VIZ_MAP, vizType) && <WorldMap mapSerie={serie} />}
              </React.Fragment>
            )}
        </Grid>
      </Grid>
    </Wrapper>
  );
};

Analysis.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  description: PropTypes.string.isRequired,
  indicatorValues: PropTypes.array.isRequired,
  vizTypes: PropTypes.array.isRequired,
};

export default withStyles(styles)(Analysis);
