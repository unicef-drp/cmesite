import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { CountrySelector, IndicatorSelector } from '../Selector';
import WorldMap from '../Map';
import DataProgress from '../DataProgress';

const styles = theme => ({
  card: {
    marginBottom: theme.spacing.unit * 2,
    background: 'none',
    boxShadow: 'none',
  },
  header: {
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
  content: {
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    '&:last-child': {
      paddingBottom: theme.spacing.unit,
    },
  },
  typo: {
    color: theme.palette.primary.dark,
  },
});

const Component = ({ classes, isHome, isLoadingData }) => {
  const invariant = (
    <React.Fragment>
      {isLoadingData ? (
        <DataProgress />
      ) : (
        <CardContent className={classes.content}>
          <WorldMap />
          <p>slider</p>
          <p>legend</p>
        </CardContent>
      )}
    </React.Fragment>
  );

  if (!isHome) return invariant;

  return (
    <React.Fragment>
      <Card className={classes.card} square>
        <CardHeader
          className={classes.header}
          title={
            <React.Fragment>
              <Typography
                variant="headline"
                align="center"
                className={classes.typo}
              >
                <FormattedMessage {...messages.title} />
              </Typography>
              <Typography variant="body2" align="center" className={classes.typo}>
                <FormattedMessage {...messages.subtitle} />
              </Typography>
            </React.Fragment>
          }
        />
        <CardContent className={classes.content}>
          <Grid container spacing={8}>
            <Grid item xs={12} md={6}>
              <CountrySelector />
            </Grid>
            <Grid item xs={12} md={6}>
              <IndicatorSelector />
            </Grid>
          </Grid>
        </CardContent>
        {invariant}
      </Card>
    </React.Fragment>
  );
};

Component.propTypes = {
  classes: PropTypes.object.isRequired,
  isHome: PropTypes.bool,
  isLoadingData: PropTypes.bool,
};

export default withStyles(styles)(Component);
