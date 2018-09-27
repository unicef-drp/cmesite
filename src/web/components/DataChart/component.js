import React from 'react';
import PropTypes from 'prop-types';
import { map, toPairs, pipe } from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Chart from '../Chart';
import DataLegend from '../DataLegend';

const styles = theme => ({
  card: {
    marginBottom: theme.spacing.unit * 2,
  },
  header: {
    paddingBottom: 0,
  },
  content: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  typo: {
    color: theme.palette.primary.dark,
  },
  toggles: {
    display: 'flex',
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
        title={<Typography className={classes.typo}>{title}</Typography>}
        subheader={
          <React.Fragment>
            <div className={classes.toggles}>
              {pipe(
                toPairs,
                map(([type, active]) => (
                  <FormControlLabel
                    key={type}
                    control={
                      <Checkbox
                        color="primary"
                        checked={active}
                        onChange={() => toggleActiveType(type)}
                      />
                    }
                    label={type}
                  />
                )),
              )(activeTypes)}
            </div>
            <Typography>Deaths per 1000 live births</Typography>
          </React.Fragment>
        }
      />
      <CardContent className={classes.content}>
        <Chart {...series} />
      </CardContent>
    </Card>
    <DataLegend {...series} />
  </React.Fragment>
);

DataChart.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  activeTypes: PropTypes.object.isRequired,
  toggleActiveType: PropTypes.func.isRequired,
};

export default withStyles(styles)(DataChart);
