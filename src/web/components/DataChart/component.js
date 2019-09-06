import React from 'react';
import PropTypes from 'prop-types';
import {
  map,
  toPairs,
  pipe,
  toLower,
  equals,
  length,
  filter,
  identity,
  values,
  sortBy,
  findIndex,
  propEq,
  path,
} from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Chart from '../Chart';
import DataHeader from '../DataHeader';
import DataLegend from '../DataLegend';
import { getSymbol } from '../Chart/utils';
import { EXCLUDED, ESTIMATE, TYPES, MODEL } from '../../constants';

const styles = theme => ({
  card: {
    marginBottom: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 4,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  typo: {
    color: theme.palette.primary.dark,
  },
  toggles: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    borderTop: `1px solid ${theme.palette.secondary.dark}`,
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing.unit,
      flexDirection: 'column',
    },
  },
  label: {
    display: 'flex',
    alignItems: 'center',
  },
});

const SIZE = 60;

const DataChart = ({
  classes,
  theme,
  title,
  activeTypes,
  toggleActiveType,
  isCompare,
  serieNames,
  highlightSerie,
  hasHighlights,
  seriesUnit,
  changeMode,
  mode,
  highlightMethod,
  highlightedMethods = {},
  ...series // uncertaintySeries, estimateSeries, previousEstimateSeries, includedSeries, excludedSeries, mergedSeries
}) => (
  <Card className={classes.card} square>
    <DataHeader title={title} changeMode={changeMode} mode={mode} isCompare={isCompare} />
    <CardContent>
      <Chart
        {...series}
        hasHighlights={hasHighlights}
        highlightedMethods={highlightedMethods}
        isCompare={isCompare}
        seriesUnit={seriesUnit}
        model={path(['estimateSeries', 0, MODEL], series)}
      />
    </CardContent>
    {activeTypes && (
      <div className={classes.toggles}>
        <Typography className={classes.typo}>
          {/*<FormattedMessage {...messages.series} />*/}
        </Typography>
        <div>
          {pipe(
            toPairs,
            sortBy(([type]) => findIndex(propEq('id', type), TYPES)),
            map(([type, active]) => (
              <FormControlLabel
                key={type}
                disabled={active && equals(1, length(values(filter(identity, activeTypes))))}
                control={
                  <Checkbox
                    color="primary"
                    checked={active}
                    onChange={() => toggleActiveType(type)}
                  />
                }
                label={
                  <span className={classes.label}>
                    {equals(type, ESTIMATE) ? null : (
                      <svg width={SIZE / 2} height={SIZE / 2}>
                        <path
                          d={getSymbol({ size: SIZE * 4 })()}
                          transform={`translate(${SIZE / 4}, ${SIZE / 4})`}
                          stroke={theme.palette.secondary.darker}
                          fill={equals(type, EXCLUDED) ? 'none' : theme.palette.secondary.darker}
                        />
                      </svg>
                    )}
                    <FormattedMessage {...messages[toLower(type)]} />
                  </span>
                }
              />
            )),
          )(activeTypes)}
        </div>
      </div>
    )}
    <DataLegend
      {...series}
      serieNames={serieNames}
      isCompare={isCompare}
      highlightSerie={highlightSerie}
      highlightMethod={highlightMethod}
      highlightedMethods={highlightedMethods}
    />
  </Card>
);

DataChart.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  title: PropTypes.string,
  activeTypes: PropTypes.object,
  toggleActiveType: PropTypes.func.isRequired,
  isCompare: PropTypes.bool,
  serieNames: PropTypes.array,
  highlightSerie: PropTypes.func.isRequired,
  highlightMethod: PropTypes.func.isRequired,
  highlightedMethods: PropTypes.object,
  hasHighlights: PropTypes.bool,
  seriesUnit: PropTypes.string,
  changeMode: PropTypes.func,
  mode: PropTypes.string,
};

export default withStyles(styles, { withTheme: true })(DataChart);
