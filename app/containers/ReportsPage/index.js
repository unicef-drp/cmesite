import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as R from 'ramda';
import { makeSelectPosts } from 'ducks/wordpress/selectors';
import { loadPosts as loadPostsCreator } from 'ducks/wordpress/actions';
import Reports from 'components/Reports';

const ReportsPage = ({ loadPosts, reports = [] }) => {
  useEffect(() => {
    loadPosts('reports');
  }, []);

  if (R.isEmpty(reports)) return null;

  return (
    <React.Fragment>
      <Helmet>
        <title>Reports</title>
        <meta name="description" content="reports page" />
      </Helmet>
      <Reports reports={reports} />
    </React.Fragment>
  );
}

ReportsPage.propTypes = {
  reports: PropTypes.array,
  loadPosts: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  reports: makeSelectPosts('reports'),
});

const withConnect = connect(
  mapStateToProps,
  { loadPosts: loadPostsCreator },
);

export default compose(
  withConnect,
  memo,
)(ReportsPage);
