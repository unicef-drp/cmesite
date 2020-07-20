import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import withStyles from '@material-ui/core/styles/withStyles';
import { FormattedMessage } from 'react-intl';
import { getAnalysis } from '../../selectors/wp';
import { changeHierarchicalCodelist } from '../../ducks/data';
import {
  getIsLoadingHierarchicalCodelists,
  getHierarchicalCodelists,
  getHierarchicalCodelist,
} from '../../selectors/data';
import Wrapper from '../Wrapper';
import Loader from '../Loader';
import DataNone from '../DataNone';
import WorldMap from '../Map/component';
import Toolbar from './toolbar';
import TimeTravel from './timeTravel';
import VizSwitch from './vizSwitch';
import CircleChart from './circleChart';
import PackChart from './packChart';
import useSeries from './useSeries';
import {
  DEFAULT_ANALYSIS_TARGET,
  ANALYSIS_TARGETS,
  DEFAULT_ANALYSIS_BOUNDARIES,
  ANALYSIS_BOUNDARIES,
  UNIT_MEASURE,
  VIZ_MAP,
  VIZ_CIRCLE,
  VIZ_PACK,
} from '../../constants';
import messages from '../../pages/Analysis/messages';

const styles = theme => ({
  wrapper: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  title: {
    color: theme.palette.primary.main,
  },
  description: {
    '& p': {
      margin: 0,
      textAlign: 'justify',
    },
  },
  wrapperInfo: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
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

const Analysis = ({
  classes,
  type,
  indicatorValues,
  vizTypes,
  isLatest,
  hasHierarchies,
  mapProps = {},
}) => {
  const dispatch = useDispatch();

  const [indicatorValueId, setIndicatorValueId] = useState(R.prop('id', R.head(indicatorValues)));
  const [seriesIndex, setSeriesIndex] = useState(0);
  const [isLoadingSeries, series] = useSeries(indicatorValueId, isLatest, setSeriesIndex);
  const [vizType, setVizType] = useState(R.head(vizTypes));

  const isLoadingHierarchicalCodelists = useSelector(getIsLoadingHierarchicalCodelists);
  const hierarchicalCodelists = useSelector(getHierarchicalCodelists);
  const hierarchicalCodelist = useSelector(getHierarchicalCodelist(type));
  const setHierarchicalCodelist = hierarchicalCodelist =>
    dispatch(changeHierarchicalCodelist(hierarchicalCodelist));

  const analysis = useSelector(getAnalysis(indicatorValueId));
  const boundaries = R.propOr(DEFAULT_ANALYSIS_BOUNDARIES, indicatorValueId, ANALYSIS_BOUNDARIES);
  const target = R.propOr(DEFAULT_ANALYSIS_TARGET, indicatorValueId, ANALYSIS_TARGETS);

  const isLoading = R.or(isLoadingSeries, isLoadingHierarchicalCodelists);
  const isBlank = R.isEmpty(series);
  const serie = R.nth(seriesIndex, series);
  const mean = R.path(['datapoints', MEAN_ID, 'y'])(serie);
  const needSwitchTypes = R.gt(R.length(vizTypes), 1);
  const needTimeTravel = R.gt(R.length(series), 1);
  const needHierarchiesSwitch = R.and(hasHierarchies, R.not(R.isEmpty(hierarchicalCodelists)));
  const indicatorValue = R.find(R.propEq('id', indicatorValueId), indicatorValues);

  const formattedVizTypes = R.map(
    id => ({ id, label: <FormattedMessage {...messages[id]} /> }),
    vizTypes,
  );

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
        {analysis && (
          <Grid item xs={12} md={4} lg={3}>
            <Typography variant="body2" className={classes.description}>
              <span
                dangerouslySetInnerHTML={{ __html: R.path(['content', 'rendered'])(analysis) }}
              />
            </Typography>
          </Grid>
        )}
        <Grid item xs={12} md={analysis ? 8 : 12} lg={analysis ? 9 : 12}>
          {isLoading && <Loader />}
          {!isLoading && isBlank && <DataNone />}
          {!isLoading &&
            !isBlank && (
              <React.Fragment>
                {needSwitchTypes && (
                  <VizSwitch
                    types={formattedVizTypes}
                    type={vizType}
                    setType={R.pipe(R.prop('id'), setVizType)}
                  />
                )}
                {needHierarchiesSwitch && (
                  <VizSwitch
                    types={R.values(hierarchicalCodelists)}
                    type={hierarchicalCodelist}
                    setType={setHierarchicalCodelist}
                  />
                )}
                {needTimeTravel && (
                  <TimeTravel
                    series={series}
                    seriesIndex={seriesIndex}
                    setSeriesIndex={setSeriesIndex}
                  />
                )}
                <div className={classes.wrapperInfo}>
                  <Typography variant="body2">
                    {R.equals(type, 'disparity') && indicatorValue && hierarchicalCodelist
                      ? `${indicatorValue.label} by ${hierarchicalCodelist.label}`
                      : null}
                  </Typography>
                  {R.is(Number, mean) && (
                    <div className={classes.info}>
                      <Typography variant="title" className={classes.infoDate}>
                        {new Date(R.prop('name', serie)).getFullYear()},&nbsp;
                      </Typography>
                      <Typography variant="title" className={classes.title}>
                        {Math.round(mean)}&nbsp;
                      </Typography>
                      <Typography variant="body2">{R.prop(UNIT_MEASURE, serie)}</Typography>
                    </div>
                  )}
                </div>
                {R.equals(VIZ_MAP, vizType) && <WorldMap mapSerie={serie} {...mapProps} />}
                {R.equals(VIZ_CIRCLE, vizType) && (
                  <CircleChart
                    serie={serie}
                    aggregate={hierarchicalCodelist}
                    boundaries={boundaries}
                    target={target}
                  />
                )}
                {R.equals(VIZ_PACK, vizType) && (
                  <PackChart
                    serie={serie}
                    aggregate={hierarchicalCodelist}
                    boundaries={boundaries}
                    target={target}
                    indicatorValueId={indicatorValueId}
                  />
                )}
                {R.equals(type, 'disparity') &&
                  indicatorValue && (
                    <Typography variant="caption" align="center">
                      {indicatorValue.label} ({R.prop(UNIT_MEASURE, serie)})
                    </Typography>
                  )}
                {R.equals(VIZ_PACK, vizType) &&
                  R.equals(type, 'sdg') && (
                    <Typography variant="caption" align="center">
                      <FormattedMessage {...messages.yearToAchieve} />
                    </Typography>
                  )}
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
  isLatest: PropTypes.bool,
  hasHierarchies: PropTypes.bool,
  indicatorValues: PropTypes.array.isRequired,
  vizTypes: PropTypes.array.isRequired,
  hierarchicalCodelists: PropTypes.object.isRequired,
  isLoadingHierarchicalCodelists: PropTypes.bool,
  mapProps: PropTypes.object,
};

export default withStyles(styles)(Analysis);
