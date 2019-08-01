import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as R from 'ramda';
import classnames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeSelectLimitedPosts, makeSelectPosts } from 'ducks/wordpress/selectors';
import { loadPosts as loadPostsCreator } from 'ducks/wordpress/actions';
import Wrapper from 'components/Wrapper';
import Splash from 'components/Splash';
import Logos from 'components/Logos';
import messages from './messages';
import useStyles from './styles';
import { EMAIL } from '../../staticConfig';

const AboutPage = ({ loadPosts, about = {}, focuses = [] }) => {
  useEffect(() => {
    loadPosts('abouts');
    loadPosts('focuses');
  }, []);

  const classes = useStyles();

  return (
    <React.Fragment>
      <Helmet>
        <title>About</title>
        <meta name="description" content="about page" />
      </Helmet>
      <Splash acf={about.acf} />
      <Wrapper classes={{ root: classes.wrapper }}>
        <Grid container className={classes.about} justify="center">
          {/* title */}
          <Grid item xs={12} sm={7} md={7} className={classes.titleWrapper}>
            <Typography variant="h5" align="center" className={classes.title}>
              {R.path(['title', 'rendered'])(about)}
            </Typography>
            <Typography variant="body2" align="center" paragraph className={classes.typo}>
              <span
                dangerouslySetInnerHTML={{
                  __html: R.path(['content', 'rendered'])(about),
                }}
              />
            </Typography>
          </Grid>

          {/* logos */}
          <Grid item xs={11} sm={10} md={10} className={classnames(classes.section, classes.logos)}>
            <Logos size="big" />
          </Grid>

          {/* title */}
          <Grid item xs={12} sm={7} md={7} className={classes.titleWrapper}>
            <Typography variant="h5" align="center" className={classes.title}>
              <FormattedMessage {...messages.focus} />
            </Typography>
          </Grid>

          {/* focuses */}
          <Grid item xs={11} sm={10} md={10} className={classes.section}>
            {R.map(focus => {
              const image = R.path(['acf', 'image'])(focus);
              return (
                <div key={focus.id} className={classes.focus}>
                  {R.isNil(image) ? null : (
                    <img src={image.url} alt={image.alt} className={classes.focusLogo} />
                  )}
                  <Typography
                    variant="body2"
                    align="center"
                    className={classes.typo}
                    style={{ lineHeight: 1.2 }}
                  >
                    {R.path(['title', 'rendered'])(focus)}
                  </Typography>
                </div>
              );
            })(focuses)}
          </Grid>

          {/* contact */}
          <Grid
            item
            xs={12}
            sm={10}
            md={10}
            className={classnames(classes.section, classes.action)}
          >
            <Button variant="contained" color="primary" href={`mailto:${EMAIL}`}>
              <FormattedMessage {...messages.action} />
            </Button>
          </Grid>
        </Grid>
      </Wrapper>
    </React.Fragment>
  );
};

AboutPage.propTypes = {
  about: PropTypes.object,
  focuses: PropTypes.array,
  loadPosts: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  about: makeSelectLimitedPosts('abouts'),
  focuses: makeSelectPosts('focuses'),
});

const withConnect = connect(
  mapStateToProps,
  { loadPosts: loadPostsCreator },
);

export default compose(
  withConnect,
  memo,
)(AboutPage);
