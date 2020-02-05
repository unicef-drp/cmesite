import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import numeral from 'numeral';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import DataHeader from '../DataHeader';
import DataNone from '../DataNone';
import DataCountryNote from '../DataCountryNote';
import {
  SERIES_NAME,
  OBS_STATUS,
  SERIES_CATEGORY,
  AGE_GROUP_OF_WOMEN,
  TIME_SINCE_FIRST_BIRTH,
  INTERVAL,
  SERIES_METHOD,
  REF_DATE,
  STD_ERR,
} from '../../constants';
import { getSeriesMethodSymbol } from '../Chart/utils';

const SIZE = 60;

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
  table: {
    minWidth: 550,
  },
});

const format = R.ifElse(R.isNil, R.always(null), n => numeral(n).format('0.0'));
const mergePropsByKey = (key, props, sep = '') =>
  R.pipe(R.pick(props), R.pluck(key), R.values, R.join(sep));

const DataTable = ({ classes, serie, title, mode, changeMode, theme }) => (
  <Card className={classes.card} square>
    <DataHeader title={title} changeMode={changeMode} mode={mode} />
    {R.either(R.isNil, R.isEmpty)(serie) ? (
      <DataNone />
    ) : (
      <CardContent>
        <Table padding="none" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>
                <FormattedMessage {...messages.seriesName} />
              </TableCell>
              <TableCell>
                <FormattedMessage {...messages.obsStatus} />
              </TableCell>
              <TableCell>
                <FormattedMessage {...messages.seriesCategory} />
              </TableCell>
              <TableCell align="center">
                <Tooltip title={<FormattedMessage {...messages.aowtfsbLabel} />}>
                  <div>
                    <FormattedMessage {...messages.aowtfsbId} />
                  </div>
                </Tooltip>
              </TableCell>
              <TableCell>
                <FormattedMessage {...messages.interval} />
              </TableCell>
              <TableCell>
                <FormattedMessage {...messages.seriesMethod} />
              </TableCell>
              <TableCell>
                <FormattedMessage {...messages.refDate} />
              </TableCell>
              <TableCell>
                <strong>
                  <FormattedMessage {...messages.value} />
                </strong>
              </TableCell>
              <TableCell>
                <FormattedMessage {...messages.stdErr} />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {R.map(
              datapoint => (
                <TableRow
                  key={mergePropsByKey('valueId', [SERIES_NAME, OBS_STATUS, REF_DATE])(datapoint)}
                  hover
                >
                  <TableCell>{R.path([SERIES_NAME, 'valueName'], datapoint)}</TableCell>
                  <TableCell>
                    <FormattedMessage
                      {...messages[R.pipe(R.path([OBS_STATUS, 'valueId']), R.toLower)(datapoint)]}
                    />
                  </TableCell>
                  <TableCell>{R.path([SERIES_CATEGORY, 'valueName'], datapoint)}</TableCell>
                  <TableCell align="center">
                    <Tooltip
                      title={mergePropsByKey(
                        'valueName',
                        [AGE_GROUP_OF_WOMEN, TIME_SINCE_FIRST_BIRTH],
                        ' ',
                      )(datapoint)}
                    >
                      <div>
                        {mergePropsByKey(
                          'valueId',
                          [AGE_GROUP_OF_WOMEN, TIME_SINCE_FIRST_BIRTH],
                          ' ',
                        )(datapoint)}
                      </div>
                    </Tooltip>
                  </TableCell>
                  <TableCell>{R.path([INTERVAL, 'valueName'], datapoint)}</TableCell>
                  <TableCell>
                    <Tooltip title={R.path([SERIES_METHOD, 'valueName'], datapoint)}>
                      <svg width={SIZE / 2} height={SIZE / 2}>
                        <path
                          d={getSeriesMethodSymbol({
                            size: SIZE * 2,
                            method: R.path([SERIES_METHOD, 'valueId'], datapoint),
                          })()}
                          transform={`translate(${SIZE / 4}, ${SIZE / 4})`}
                          stroke={theme.palette.secondary.darker}
                          fill={theme.palette.secondary.darker}
                        />
                      </svg>
                    </Tooltip>
                  </TableCell>
                  <TableCell>{R.path([REF_DATE, 'valueName'], datapoint)}</TableCell>
                  <TableCell>
                    <strong>{format(R.prop('y', datapoint))}</strong>
                  </TableCell>
                  <TableCell>{format(R.path([STD_ERR, 'valueName'], datapoint))}</TableCell>
                </TableRow>
              ),
              serie,
            )}
          </TableBody>
        </Table>
      </CardContent>
    )}
    <DataCountryNote />
  </Card>
);

DataTable.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  changeMode: PropTypes.func.isRequired,
  serie: PropTypes.array,
  title: PropTypes.string,
  mode: PropTypes.string,
};

export default withStyles(styles, { withTheme: true })(DataTable);
