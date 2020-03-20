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
import CircleChart from './circleChart';
import useSeries from './useSeries';
import { UNIT_MEASURE, VIZ_MAP, VIZ_CHART } from '../../constants';
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
  return <CircleChart />;
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
