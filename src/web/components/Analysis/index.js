import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import withStyles from '@material-ui/core/styles/withStyles';
import withIndicatorValues from './withIndicatorValues';
import Wrapper from '../Wrapper';
import Loader from '../Loader';
import DataNone from '../DataNone';
import Toolbar from './toolbar';
import { INDICATOR_IDS } from '../../constants';

const styles = theme => ({
  wrapper: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  title: {
    color: theme.palette.primary.main,
  },
});

const Analysis = ({ classes, type }) => {
  const initialIndicatorValueId = R.pipe(R.propOr([], type), set => set.values().next().value)(
    INDICATOR_IDS,
  );
  const [indicatorValueId, setIndicatorValueId] = useState(initialIndicatorValueId);
  const [isLoading, indicatorValues] = withIndicatorValues(type);

  if (isLoading) return <Loader />;
  if (R.isEmpty(indicatorValues)) return <DataNone />;

  const title = 'Progress';
  const description = `The world made remarkable progress in child survival in the past few decades, 
    and millions of children have better survival chances than in 1990–5 1 in 26 children died 
    before reaching age five in 2018, compared to 1 in 11 in 1990.
    Despite the global progress in reducing child mortality over the past few decades, 
    an estimated 5.3 million children under age five died in 2018–roughly half of those deaths 
    occurred in sub-Saharan Africa.`;

  return (
    <Wrapper classes={{ root: classes.wrapper }}>
      <Grid spacing={32} container>
        <Grid item xs={12}>
          <Typography variant="title" className={classes.title}>
            {title}
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
          map
        </Grid>
      </Grid>
    </Wrapper>
  );
};

Analysis.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default withStyles(styles)(Analysis);
