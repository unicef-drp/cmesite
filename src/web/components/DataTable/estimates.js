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
import DataNone from '../DataNone';
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

const EvenTableCell = withStyles({ root: { width: '25%' } })(TableCell);

const DataTable = ({ classes, series, title, mode, changeMode, width }) => (
  <Card className={classes.card} square>
    <DataHeader title={title} changeMode={changeMode} mode={mode} />
    {R.either(R.isNil, R.isEmpty)(series) ? (
      <DataNone />
    ) : (
      <CardContent>
        <Table padding={isWidthUp('sm', width) ? 'default' : 'dense'}>
          <TableHead>
            <TableRow>
              <EvenTableCell>
                <FormattedMessage {...messages.year} />
              </EvenTableCell>
              <EvenTableCell>
                <strong>
                  <FormattedMessage {...messages.value} />
                </strong>
              </EvenTableCell>
              <EvenTableCell>
                <FormattedMessage {...messages.lower} />
              </EvenTableCell>
              <EvenTableCell>
                <FormattedMessage {...messages.upper} />
              </EvenTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {R.map(
              datapoint => (
                <TableRow key={R.path([REF_DATE, 'valueId'], datapoint)} hover>
                  <EvenTableCell>
                    {Math.floor(R.path([REF_DATE, 'valueName'], datapoint))}
                  </EvenTableCell>
                  <EvenTableCell>
                    <strong>{datapoint.y}</strong>
                  </EvenTableCell>
                  <EvenTableCell>{datapoint.y0}</EvenTableCell>
                  <EvenTableCell>{datapoint.y1}</EvenTableCell>
                </TableRow>
              ),
              R.propOr([], 'datapoints', R.head(series)),
            )}
          </TableBody>
        </Table>
      </CardContent>
    )}
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
