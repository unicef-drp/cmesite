import React from 'react';
import PropTypes from 'prop-types';
import { map, toPairs, pipe, toLower, equals, length, filter, identity, values } from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Chart from '../Chart';
import DataLegend from '../DataLegend';
import { getSymbol } from '../Chart/utils';
import { EXCLUDED, ESTIMATE } from '../../constants';

const styles = theme => ({
  card: {
    marginBottom: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 4,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  header: {
    //backgroundColor: theme.palette.secondary.dark,
    paddingBottom: 0,
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
  ...series
}) => (
  <Card className={classes.card} square>
    <CardHeader
      className={classes.header}
      title={
        <Typography align="center" variant="title" className={classes.typo}>
          {title}
        </Typography>
      }
    />
    <CardContent>
      <Chart {...series} isCompare={isCompare} />
    </CardContent>
    {activeTypes && (
      <div className={classes.toggles}>
        <Typography className={classes.typo}>
          {/*<FormattedMessage {...messages.series} />*/}
        </Typography>
        <div>
          {pipe(
            toPairs,
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
                          stroke={theme.palette.secondary.dark}
                          fill={equals(type, EXCLUDED) ? 'none' : theme.palette.secondary.dark}
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
    <DataLegend {...series} serieNames={serieNames} isCompare={isCompare} />
  </Card>
);

DataChart.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  title: PropTypes.string,
  activeTypes: PropTypes.object,
  toggleActiveType: PropTypes.func.isRequired,
  isCompare: PropTypes.bool,
  serieNames: PropTypes.array.isRequired,
};

export default withStyles(styles, { withTheme: true })(DataChart);
