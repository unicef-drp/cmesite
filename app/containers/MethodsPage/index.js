import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as R from 'ramda';
import { makeSelectPost, makeSelectFilteredPosts } from 'ducks/wordpress/selectors';
import { loadPosts as loadPostsCreator } from 'ducks/wordpress/actions';
import Reports from 'components/Reports';
import Method from 'components/Method';

const MethodsPage = ({ loadPosts, method, reports = [] }) => {
  useEffect(() => {
    loadPosts('methods');
  }, []);

  if (R.isNil(method)) return null;

  return (
    <React.Fragment>
      <Helmet>
        <title>Methods</title>
        <meta name="description" content="methods page" />
      </Helmet>
      <Method {...method} />
      <Reports reports={reports} isSecondary />
    </React.Fragment>
  );
}

MethodsPage.propTypes = {
  method: PropTypes.object,
  reports: PropTypes.array,
  loadPosts: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  method: makeSelectPost('methods'),
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
