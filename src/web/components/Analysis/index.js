import { compose, branch, renderComponent } from 'recompose';
import { createStructuredSelector } from 'reselect';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { getAnalysisIndicatorDimensionValues } from '../../selectors/data';
import Component from './component';
import DataNone from '../DataNone';

export default compose(
  connect(
    createStructuredSelector({
      indicatorValues: getAnalysisIndicatorDimensionValues,
    }),
  ),
  branch(({ indicatorValues }) => R.isEmpty(indicatorValues), renderComponent(DataNone)),
)(Component);
