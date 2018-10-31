import React from 'react';
import PropTypes from 'prop-types';
import { path, prop } from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const style = theme => ({
  card: {
    maxWidth: 200,
  },
  content: {
    '&:last-child': {
      paddingBottom: theme.spacing.unit,
    },
    padding: theme.spacing.unit,
  },
});

const Tooltip = ({ classes, theme, d, x, y, color }) => (
  <Card
    className={classes.card}
    style={{
      position: 'absolute',
      top: y + theme.spacing.unit * 2,
      left: x + theme.spacing.unit * 3,
    }}
    square
    elevation={2}
  >
    <CardContent className={classes.content}>
      {console.log(d)}
      <Typography variant="body1" style={{ color }}>
        {path(['SERIES_NAME', 'valueName'], d)}
      </Typography>
      <Typography variant="body2">{prop('y', d)}</Typography>
      <Typography variant="body2">
        {path(['TIME_PERIOD', 'valueName'], d)}
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
  color: PropTypes.string,
};

export default withStyles(style, { withTheme: true })(Tooltip);
