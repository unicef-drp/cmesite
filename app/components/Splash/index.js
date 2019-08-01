import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { useTheme } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Wrapper from 'components/Wrapper';
import useStyles from './styles';

const Splash = ({ acf = {}, title = {}, content = {} }) => {
  const classes = useStyles({ url: R.path(['image', 'url'], acf) });
  const theme = useTheme();

  return (
    <div className={classes.splash}>
      {R.not(R.isEmpty(content)) && (
        <Wrapper>
          <Grid container alignItems="center" className={classes.wrapper}>
            <Grid item xs={12} sm={6} md={4} className={classes.content}>
              <Typography variant="h4" color="secondary" paragraph>
                {title.rendered}
              </Typography>
              <Typography variant="body2" color="secondary">
                <span dangerouslySetInnerHTML={{ __html: content.rendered }} />
              </Typography>
            </Grid>
          </Grid>
        </Wrapper>
      )}
    </div>
  );
};

Splash.propTypes = {
  acf: PropTypes.object,
  title: PropTypes.object,
  content: PropTypes.object,
};

export default Splash;
