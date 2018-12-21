import React from 'react';
import PropTypes from 'prop-types';
import { path, prop, isNil, always, ifElse, pipe, join, values, pick, pluck } from 'ramda';
import numeral from 'numeral';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { TOOLTIP_SERIES_KEYS, RELEVANT_DIMENSIONS, REF_DATE } from '../../constants';

const WIDTH = 250;

const style = theme => ({
  card: {
    width: WIDTH,
  },
  content: {
    '&:last-child': {
      paddingBottom: theme.spacing.unit,
    },
    padding: theme.spacing.unit,
  },
});

const format = ifElse(isNil, always(null), n => numeral(n).format('0.00'));
const getLabel = ({ isCompare }) =>
  pipe(
    pick(isCompare ? [...RELEVANT_DIMENSIONS, ...TOOLTIP_SERIES_KEYS] : TOOLTIP_SERIES_KEYS),
    values,
    pluck('valueName'),
    join(' '),
  );

const getLeft = ({ x, width, theme }) => {
  const isFlipped = x > width / 2;
  return x - (isFlipped ? WIDTH : 0) + theme.spacing.unit * (isFlipped ? 2 : 3.5);
};

const getTop = ({ y, height, theme }) => {
  const isFlipped = y < height / 2;
  return y + (isFlipped ? 0 : -150) + (isFlipped ? theme.spacing.unit * 2 : 0);
};

const Tooltip = ({ classes, theme, d, x, y, color, width, height, isCompare, isUncertainty }) => (
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
      <Typography variant="body1" style={{ color }}>
        {getLabel({ isCompare })(d)}
      </Typography>
      <Typography variant="body2">
        <strong>
          {isUncertainty
            ? join(' - ', [format(prop('y0', d)), format(prop('y1', d))])
            : format(prop('y', d))}
        </strong>{' '}
        ({path([REF_DATE, 'valueName'], d)})
      </Typography>
    </CardContent>
  </Card>
);

Tooltip.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  d: PropTypes.object.isRequired,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  isCompare: PropTypes.bool,
  isUncertainty: PropTypes.bool,
};

export default withStyles(style, { withTheme: true })(Tooltip);
