import React from 'react';
import PropTypes from 'prop-types';
import { map, values, addIndex } from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { symbolGenerator, getSymbolFill } from '../Chart/utils';

const styles = theme => ({
  list: {
    width: '100%',
    padding: 0,
  },
});

const SIZE = 60;

const DataLegend = ({ classes, theme, series }) => (
  <List className={classes.list}>
    {addIndex(map)(({ id, name, type, isEstimate }, index) => {
      const color = isEstimate
        ? theme.palette.primary.main
        : theme.palette.chartColorScale(index);
      return (
        <ListItem key={id} dense button>
          <svg width={SIZE / 2} height={SIZE / 2}>
            <g>
              <path
                d={symbolGenerator(SIZE)()}
                transform={`translate(${SIZE / 4}, ${SIZE / 4})`}
                stroke={color}
                fill={getSymbolFill(type, color)}
              />
            </g>
          </svg>
          <ListItemText primary={`${name} (${type})`} />
        </ListItem>
      );
    }, values(series))}
  </List>
);

DataLegend.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  series: PropTypes.array.isRequired,
};

export default withStyles(styles, { withTheme: true })(DataLegend);
