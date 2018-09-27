import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import DataDimension from '../DataDimension';

const styles = theme => ({
  wrapper: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  content: {
    paddingBottom: theme.spacing.unit,
  },
  typo: {
    color: theme.palette.primary.dark,
  },
});

const DataDownloadDimensions = ({ classes, dimensions, changeSelection }) => (
  <Grid container className={classes.wrapper} spacing={16}>
    {map(({ label, ...dimension }) => (
      <Grid item xs={12} md={4} key={dimension.id}>
        <Card square>
          <CardContent className={classes.content}>
            <Typography className={classes.typo}>{label}</Typography>
          </CardContent>
          <DataDimension dimension={dimension} changeSelection={changeSelection} />
        </Card>
      </Grid>
    ))(dimensions)}
  </Grid>
);

DataDownloadDimensions.propTypes = {
  classes: PropTypes.object.isRequired,
  dimensions: PropTypes.array.isRequired,
  changeSelection: PropTypes.func.isRequired,
};

export default withStyles(styles)(DataDownloadDimensions);
