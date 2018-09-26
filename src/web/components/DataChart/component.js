import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chart from '../Chart';
import DataLegend from '../DataLegend';

const styles = theme => ({
  card: {
    marginBottom: theme.spacing.unit * 2,
  },
  content: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  typo: {
    color: theme.palette.primary.dark,
  },
});

const DataChart = ({ classes, title, ...series }) => (
  <React.Fragment>
    <Card className={classes.card} square>
      <CardHeader
        title={<Typography className={classes.typo}>{title}</Typography>}
        subheader="Deaths per 1000 live births"
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
};

export default withStyles(styles)(DataChart);
