import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { getDefaultFormatValue } from '../../lib/formatters';

const styles = theme => ({
  content: {
    '&:last-child': {
      paddingBottom: theme.spacing.unit,
    },
    padding: theme.spacing.unit,
  },
});

const Tooltip = ({ classes, datum }) => (
  <Card square elevation={2}>
    <CardContent className={classes.content}>
      <Typography variant="body2" inline>
        {datum.label}:&nbsp;
      </Typography>
      <Typography variant="body2" inline>
        <strong>{getDefaultFormatValue(datum.value)}</strong>
      </Typography>
    </CardContent>
  </Card>
);

Tooltip.propTypes = {
  classes: PropTypes.object.isRequired,
  datum: PropTypes.object.isRequired,
};

export default withStyles(styles)(Tooltip);
