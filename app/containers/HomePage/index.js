import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as R from 'ramda';
import Grid from '@material-ui/core/Grid';
import { makeSelectLimitedPosts, makeSelectFilteredPosts, makeSelectPosts } from 'ducks/wordpress/selectors';
import { loadPosts as loadPostsCreator } from 'ducks/wordpress/actions';
import Splash from 'components/Splash';
import Wrapper from 'components/Wrapper';
import useStyles from './styles';
import News from 'components/News';
import Reports from 'components/Reports';
import Datasets from 'components/Datasets';

const HomePage = ({ loadPosts, splash, news = [], reports = [], datasets = [] }) => {
  useEffect(() => {
    loadPosts('splashes');
    loadPosts('news');
    loadPosts('datasets');
  }, []);

  const classes = useStyles();

  return (
    <React.Fragment>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="home page" />
      </Helmet>
      <Splash {...splash} />
      <Wrapper classes={{ root: classes.wrapper }}>
        <Grid spacing={4} container>
          <Grid item xs={12} md={4} lg={3}>
            <News news={news} />
          </Grid>
          <Grid item xs={12} md={8} lg={9}>
            <Grid container spacing={2} className={classes.root}>
              {'<DataMap isHome />'}
            </Grid>
          </Grid>
        </Grid>
      </Wrapper>
      <Datasets datasets={datasets} />
      <Reports reports={reports} isSecondary />
    </React.Fragment>
  );
};

HomePage.propTypes = {
  splash: PropTypes.object,
  reports: PropTypes.array,
  news: PropTypes.array,
  loadPosts: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  splash: makeSelectLimitedPosts('splashes'),
  reports: makeSelectFilteredPosts('reports', 'ishome'),
  news: makeSelectLimitedPosts('news', 2),
  datasets: makeSelectPosts('datasets'),
});

const withConnect = connect(
  mapStateToProps,
  { loadPosts: loadPostsCreator },
);

export default compose(
  withConnect,
  memo,
)(HomePage);
