import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectPosts } from 'ducks/wordpress/selectors';
import Reports from 'components/Reports';

const ReportsPage = ({ reports = [] }) => (
  <React.Fragment>
    <Helmet>
      <title>Reports</title>
      <meta name="description" content="reports page" />
    </Helmet>
    <Reports reports={reports} />
  </React.Fragment>
);

ReportsPage.propTypes = {
  reports: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  reports: makeSelectPosts('reports'),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(
  withConnect,
  memo,
)(ReportsPage);
