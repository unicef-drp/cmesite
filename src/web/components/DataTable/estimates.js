import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
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
import { REF_DATE } from '../../constants';

const styles = theme => ({
  card: {
    marginBottom: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 4,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  table: {
    minWidth: 350,
  },
  typo: {
    color: theme.palette.primary.dark,
  },
});

const DataTable = ({ classes, series, title, mode, changeMode, width }) => (
  <Card className={classes.card} square>
    <DataHeader title={title} changeMode={changeMode} mode={mode} />
    <CardContent>
      <Table padding={isWidthUp('sm', width) ? 'default' : 'dense'}>
        <TableHead>
          <TableRow>
            <TableCell>
              <FormattedMessage {...messages.year} />
            </TableCell>
            <TableCell>
              <strong>
                <FormattedMessage {...messages.value} />
              </strong>
            </TableCell>
            <TableCell>
              <FormattedMessage {...messages.lower} />
            </TableCell>
            <TableCell>
              <FormattedMessage {...messages.upper} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {R.map(
            datapoint => (
              <TableRow key={R.path([REF_DATE, 'valueId'], datapoint)}>
                <TableCell>{Math.floor(R.path([REF_DATE, 'valueName'], datapoint))}</TableCell>
                <TableCell>
                  <strong>{datapoint.y}</strong>
                </TableCell>
                <TableCell>{datapoint.y0}</TableCell>
                <TableCell>{datapoint.y1}</TableCell>
              </TableRow>
            ),
            R.propOr([], 'datapoints', R.head(series)),
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
  width: PropTypes.string,
  mode: PropTypes.string,
};

export default R.compose(withWidth(), withStyles(styles))(DataTable);
