import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import withStyles from '@material-ui/core/styles/withStyles';
import { FormattedMessage } from 'react-intl';
import Wrapper from '../Wrapper';
import Toolbar from './toolbar';
import TimeTravel from './timeTravel';
import messages from '../../pages/Analysis/messages';

const styles = theme => ({
  wrapper: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  title: {
    color: theme.palette.primary.main,
  },
});

const Analysis = ({ classes, type, description, indicatorValues }) => {
  const [indicatorValueId, setIndicatorValueId] = useState(R.prop('id', R.head(indicatorValues)));
  const [series, setSeries] = useState([]);
  const [seriesIndex, setSeriesIndex] = useState(0);

  return (
    <Wrapper classes={{ root: classes.wrapper }}>
      <Grid spacing={32} container>
        <Grid item xs={12}>
          <Typography variant="title" className={classes.title}>
            <FormattedMessage {...messages[type]} />
          </Typography>
          <Toolbar
            values={indicatorValues}
            valueId={indicatorValueId}
            setValueId={setIndicatorValueId}
          />
          <Divider />
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Typography variant="body2" align="justify">
            {description}
          </Typography>
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          <TimeTravel series={series} seriesIndex={seriesIndex} setSeriesIndex={setSeriesIndex} />
          map
        </Grid>
      </Grid>
    </Wrapper>
  );
};

Analysis.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  indicatorValues: PropTypes.array.isRequired,
};

export default withStyles(styles)(Analysis);
