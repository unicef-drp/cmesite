import React from 'react';
import PropTypes from 'prop-types';
import { map, addIndex, propOr } from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { symbolGenerator, getSymbolFill, getColor } from '../Chart/utils';

const styles = () => ({
  list: {
    width: '100%',
    padding: 0,
  },
});

const SIZE = 60;

const DataLegend = ({ classes, theme, series }) => (
  <List className={classes.list}>
    {addIndex(map)(
      ({ id, name, type }, index) => (
        <ListItem key={id} dense button>
          <svg width={SIZE / 2} height={SIZE / 2}>
            <g>
              <path
                d={symbolGenerator(SIZE)()}
                transform={`translate(${SIZE / 4}, ${SIZE / 4})`}
                stroke={getColor(type, index, theme)}
                fill={getSymbolFill(type, index, theme)}
              />
            </g>
          </svg>
          <ListItemText primary={`${name} (${type})`} />
        </ListItem>
      ),
      propOr([], 'EXCLUDED', series),
    )}
  </List>
);

DataLegend.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  series: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(DataLegend);
