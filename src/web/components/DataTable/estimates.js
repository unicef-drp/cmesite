import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import DataHeader from '../DataHeader';
import DataNone from '../DataNone';
import DataCountryNote from '../DataCountryNote';
import { REF_DATE } from '../../constants';
import { getDefaultFormatValue } from '../../lib/formatters';

const styles = theme => ({
  card: {
    marginBottom: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 4,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  cardContent: {
    padding: 0,
    paddingTop: theme.spacing.unit * 2,
  },
  table: {
    minWidth: 350,
  },
  typo: {
    color: theme.palette.primary.dark,
  },
  highlighted: {
    fontWeight: 'bold',
  },
});

const EvenTableCell = withStyles({ root: { width: '25%' } })(TableCell);

const columns = {
  year: { accessor: R.path([REF_DATE, 'valueName']) },
  estimate: { accessor: R.prop('y'), isHighlighted: true, isNumeric: true },
  lower: { accessor: R.prop('y0'), isNumeric: true },
  upper: { accessor: R.prop('y1'), isNumeric: true },
};

const desc = (a, b, accessor) => {
  if (accessor(b) < accessor(a)) return -1;
  if (accessor(b) > accessor(a)) return 1;
  return 0;
};

const stableSort = (array, cmp) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
};

const getSorting = (order, orderBy) => {
  const accessor = columns[orderBy].accessor;
  return order === 'desc' ? (a, b) => desc(a, b, accessor) : (a, b) => -desc(a, b, accessor);
};

const DataTable = ({ classes, datapoints, title, mode, changeMode, width }) => {
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('year');

  const sortHandler = key => {
    setOrderBy(key);
    if (R.and(R.equals(orderBy, key), R.equals(order, 'desc'))) setOrder('asc');
    else setOrder('desc');
  };

  const sortedDatapoints = stableSort(datapoints, getSorting(order, orderBy));

  return (
    <Card className={classes.card} square>
      <DataHeader title={title} changeMode={changeMode} mode={mode} />
      {R.either(R.isNil, R.isEmpty)(datapoints) ? (
        <DataNone />
      ) : (
        <CardContent className={classes.cardContent}>
          <Table padding={isWidthUp('sm', width) ? 'default' : 'dense'}>
            <TableHead>
              <TableRow>
                {R.map(([key, { isHighlighted, isNumeric }]) => (
                  <EvenTableCell
                    key={key}
                    align={isNumeric ? 'right' : 'left'}
                    sortDirection={R.equals(key, orderBy) ? order : false}
                  >
                    <TableSortLabel
                      active={R.equals(key, orderBy)}
                      direction={order}
                      onClick={() => sortHandler(key)}
                    >
                      <FormattedMessage
                        {...messages[key]}
                        className={classnames({ highlighted: isHighlighted })}
                      />
                    </TableSortLabel>
                  </EvenTableCell>
                ))(R.toPairs(columns))}
              </TableRow>
            </TableHead>
            <TableBody>
              {R.map(
                datapoint => (
                  <TableRow key={R.path([REF_DATE, 'valueId'], datapoint)} hover>
                    <EvenTableCell align="left">
                      {R.path([REF_DATE, 'valueName'], datapoint)}
                    </EvenTableCell>
                    <EvenTableCell align="right">
                      <strong>{getDefaultFormatValue(datapoint.y)}</strong>
                    </EvenTableCell>
                    <EvenTableCell align="right">
                      {getDefaultFormatValue(datapoint.y0)}
                    </EvenTableCell>
                    <EvenTableCell align="right">
                      {getDefaultFormatValue(datapoint.y1)}
                    </EvenTableCell>
                  </TableRow>
                ),
                sortedDatapoints,
              )}
            </TableBody>
          </Table>
        </CardContent>
      )}
      <DataCountryNote />
    </Card>
  );
};

DataTable.propTypes = {
  classes: PropTypes.object.isRequired,
  changeMode: PropTypes.func.isRequired,
  datapoints: PropTypes.array,
  title: PropTypes.string,
  width: PropTypes.string,
  mode: PropTypes.string,
};

export default R.compose(withWidth(), withStyles(styles))(DataTable);
