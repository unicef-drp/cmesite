import { isEmpty } from 'ramda';
import { compose, branch, renderNothing, withProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
  getReports,
  getFeaturedReports,
  getMethodReports,
} from '../../selectors/wp';
import Component from './component';

const noReport = branch(({ reports }) => isEmpty(reports), renderNothing);
const isSecondary = withProps(() => ({ isSecondary: true }));

export const FeaturedReports = compose(
  connect(createStructuredSelector({ reports: getFeaturedReports })),
  isSecondary,
  noReport,
)(Component);

export const MethodReports = compose(
  connect(createStructuredSelector({ reports: getMethodReports })),
  isSecondary,
  noReport,
)(Component);

export default compose(
  connect(createStructuredSelector({ reports: getReports })),
  noReport,
)(Component);
