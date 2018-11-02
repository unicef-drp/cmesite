import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
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
  title: {
    display: 'flex',
    alignItems: 'baseline',
  },
  typo: {
    color: theme.palette.primary.dark,
  },
  subtitle: {
    paddingLeft: theme.spacing.unit,
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
            <div className={classes.title}>
              <Typography variant="headline" className={classes.typo}>
                <FormattedMessage {...messages.title} />
              </Typography>
              <Typography
                variant="title"
                className={classnames(classes.typo, classes.subtitle)}
              >
                <FormattedMessage {...messages.subtitle} />
              </Typography>
            </div>
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
