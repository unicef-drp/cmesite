import React from 'react';
import PropTypes from 'prop-types';
import {
  map,
  toPairs,
  pipe,
  toLower,
  equals,
  length,
  filter,
  identity,
  values,
} from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Chart from '../Chart';
import DataLegend from '../DataLegend';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const styles = theme => ({
  card: {
    marginBottom: theme.spacing.unit * 2,
  },
  header: {
    //backgroundColor: theme.palette.secondary.dark,
    paddingBottom: 0,
  },
  typo: {
    color: theme.palette.primary.dark,
  },
  toggles: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    borderTop: `1px solid ${theme.palette.secondary.dark}`,
  },
});

const DataChart = ({
  classes,
  title,
  activeTypes,
  toggleActiveType,
  ...series
}) => (
  <React.Fragment>
    <Card className={classes.card} square>
      <CardHeader
        className={classes.header}
        title={
          <Typography align="center" variant="title" className={classes.typo}>
            {title}
          </Typography>
        }
      />
      <CardContent>
        <Chart {...series} />
      </CardContent>
      {activeTypes && (
        <div className={classes.toggles}>
          <Typography className={classes.typo}>
            <FormattedMessage {...messages.series} />
          </Typography>
          <div>
            {pipe(
              toPairs,
              map(([type, active]) => (
                <FormControlLabel
                  key={type}
                  disabled={
                    active &&
                    equals(1, length(values(filter(identity, activeTypes))))
                  }
                  control={
                    <Checkbox
                      color="primary"
                      checked={active}
                      onChange={() => toggleActiveType(type)}
                    />
                  }
                  label={<FormattedMessage {...messages[toLower(type)]} />}
                />
              )),
            )(activeTypes)}
          </div>
        </div>
      )}
      <DataLegend {...series} />
    </Card>
  </React.Fragment>
);

DataChart.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  activeTypes: PropTypes.object,
  toggleActiveType: PropTypes.func.isRequired,
};

export default withStyles(styles)(DataChart);
