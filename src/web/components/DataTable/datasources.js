import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import DataHeader from '../DataHeader';
import {
  SERIES_NAME,
  SERIES_YEAR,
  OBS_STATUS,
  UNIT_MEASURE,
  SERIES_CATEGORY,
  SERIES_TYPE,
  AGE_GROUP_OF_WOMEN,
  TIME_SINCE_FIRST_BIRTH,
  INTERVAL,
  SERIES_METHOD,
  REF_DATE,
  STD_ERR,
} from '../../constants';

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
  cell: {
    paddingLeft: theme.spacing.unit * 0.5,
    paddingRight: theme.spacing.unit * 0.5,
    borderRight: '1px solid rgba(224, 224, 224, 1)',
  },
});

const DataTable = ({ classes, series, title, changeMode }) => (
  <Card className={classes.card} square>
    <DataHeader title={title} changeMode={changeMode} />
    <CardContent>
      <Table padding="none">
        <TableHead>
          <TableRow>
            <TableCell className={classes.cell}>
              <FormattedMessage {...messages.seriesName} />
            </TableCell>
            <TableCell className={classes.cell}>
              <FormattedMessage {...messages.seriesYear} />
            </TableCell>
            <TableCell className={classes.cell}>
              <FormattedMessage {...messages.obsStatus} />
            </TableCell>
            <TableCell className={classes.cell}>
              <FormattedMessage {...messages.unitMeasure} />
            </TableCell>
            <TableCell className={classes.cell}>
              <FormattedMessage {...messages.seriesCategory} />
            </TableCell>
            <TableCell className={classes.cell}>
              <FormattedMessage {...messages.seriesType} />
            </TableCell>
            <TableCell className={classes.cell}>
              <FormattedMessage {...messages.ageGroupOfWomen} />
            </TableCell>
            <TableCell className={classes.cell}>
              <FormattedMessage {...messages.timeSinceFirstBirth} />
            </TableCell>
            <TableCell className={classes.cell}>
              <FormattedMessage {...messages.interval} />
            </TableCell>
            <TableCell className={classes.cell}>
              <FormattedMessage {...messages.seriesMethod} />
            </TableCell>
            <TableCell className={classes.cell}>
              <FormattedMessage {...messages.refDate} />
            </TableCell>
            <TableCell className={classes.cell}>
              <FormattedMessage {...messages.value} />
            </TableCell>
            <TableCell className={classes.cell}>
              <FormattedMessage {...messages.stdErr} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {R.map(
            ({ id, datapoints }) => (
              <React.Fragment key={id}>
                {R.map(
                  datapoint => (
                    <TableRow key={`${id}-${R.path([REF_DATE, 'valueId'], datapoint)}`}>
                      {R.map(
                        key => (
                          <TableCell key={key} className={classes.cell}>
                            {R.pipe(
                              R.prop(key),
                              R.ifElse(R.is(Number), R.identity, R.prop('valueName')),
                            )(datapoint)}
                          </TableCell>
                        ),
                        [
                          SERIES_NAME,
                          SERIES_YEAR,
                          OBS_STATUS,
                          UNIT_MEASURE,
                          SERIES_CATEGORY,
                          SERIES_TYPE,
                          AGE_GROUP_OF_WOMEN,
                          TIME_SINCE_FIRST_BIRTH,
                          INTERVAL,
                          SERIES_METHOD,
                          REF_DATE,
                          'y',
                          STD_ERR,
                        ],
                      )}
                    </TableRow>
                  ),
                  datapoints,
                )}
              </React.Fragment>
            ),
            series,
          )}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

DataTable.propTypes = {
  classes: PropTypes.object.isRequired,
  changeMode: PropTypes.func.isRequired,
  series: PropTypes.array,
  title: PropTypes.string,
};

export default withStyles(styles)(DataTable);
