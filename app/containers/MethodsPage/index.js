import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as R from 'ramda';
import { makeSelectLimitedPosts, makeSelectFilteredPosts } from 'ducks/wordpress/selectors';
import { loadPosts as loadPostsCreator } from 'ducks/wordpress/actions';
import Typography from '@material-ui/core/Typography';
import Reports from 'components/Reports';
import Wrapper from 'components/Wrapper';
import useStyles from './styles';

const MethodsPage = ({ loadPosts, method, reports = [] }) => {
  useEffect(() => {
    loadPosts('methods');
  }, []);

  const classes = useStyles();

  if (R.isNil(method)) return null;

  return (
    <React.Fragment>
      <Helmet>
        <title>Methods</title>
        <meta name="description" content="methods page" />
      </Helmet>
      <Wrapper classes={{ root: classes.wrapper }}>
        <div className={classes.root}>
          <Typography variant="h5" align="center" className={classes.typo}>
            {method.title.rendered}
          </Typography>
          <Typography variant="body2" align="center" paragraph>
            <span dangerouslySetInnerHTML={{ __html: method.content.rendered }} />
          </Typography>
          {method.acf.image && <img className={classes.image} src={method.acf.image.url} alt={method.acf.image.alt} />}
        </div>
      </Wrapper>
      <Reports reports={reports} isSecondary />
    </React.Fragment>
  );
};

MethodsPage.propTypes = {
  method: PropTypes.object,
  reports: PropTypes.array,
  loadPosts: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  method: makeSelectLimitedPosts('methods'),
  reports: makeSelectFilteredPosts('reports', 'ismethod'),
});

const withConnect = connect(
  mapStateToProps,
  { loadPosts: loadPostsCreator },
);

export default compose(
  withConnect,
  memo,
)(MethodsPage);
