import React from 'react';
import PropTypes from 'prop-types';
import { path, prop, isNil, always, ifElse } from 'ramda';
import numeral from 'numeral';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { REF_AREA } from '../../constants';

const WIDTH = 200;
const HEIGHT = 80;

const style = theme => ({
  card: {
    width: WIDTH,
    height: HEIGHT,
  },
  content: {
    '&:last-child': {
      paddingBottom: theme.spacing.unit,
    },
    padding: theme.spacing.unit,
  },
});

const format = ifElse(isNil, always(null), n => numeral(n).format('0.00'));

const getLeft = ({ x, width, theme }) => {
  return 0;
  //const isFlipped = x > width / 2;
  //return x - (isFlipped ? WIDTH : 0) + theme.spacing.unit * (isFlipped ? 2 : 3.5);
};

const getTop = ({ y, height, theme }) => {
  return y - 64 - 64;
  //const isFlipped = y < height / 2;
  //return y + (isFlipped ? 0 : -HEIGHT) + (isFlipped ? theme.spacing.unit * 2 : 0);
};

const Tooltip = ({ classes, theme, d, x, y, width, height }) => (
  <Card
    className={classes.card}
    style={{
      position: 'absolute',
      top: getTop({ y, height, theme }),
      left: getLeft({ x, width, theme }),
    }}
    square
    elevation={2}
  >
    <CardContent className={classes.content}>
      <Typography variant="body2" color="primary">
        {path([REF_AREA, 'valueName'], d)}
      </Typography>
      <Typography variant="body2">
        {format(prop('y0', d))}
        <strong>{format(prop('y', d))}</strong>
        {format(prop('y1', d))}
      </Typography>
    </CardContent>
  </Card>
);

Tooltip.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  d: PropTypes.object,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default withStyles(style, { withTheme: true })(Tooltip);
