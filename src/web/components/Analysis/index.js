import { compose, withProps, branch, renderComponent } from 'recompose';
import { createStructuredSelector } from 'reselect';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { getAnalysisIndicatorDimensionValues } from '../../selectors/data';
import Component from './component';
import DataNone from '../DataNone';

const description = `The world made remarkable progress in child survival in the past few decades, 
  and millions of children have better survival chances than in 1990–5 1 in 26 children died 
  before reaching age five in 2018, compared to 1 in 11 in 1990.
  Despite the global progress in reducing child mortality over the past few decades, 
  an estimated 5.3 million children under age five died in 2018–roughly half of those deaths 
  occurred in sub-Saharan Africa.`;

export default compose(
  connect(
    createStructuredSelector({
      indicatorValues: getAnalysisIndicatorDimensionValues,
    }),
  ),
  branch(({ indicatorValues }) => R.isEmpty(indicatorValues), renderComponent(DataNone)),
  withProps({ description }),
)(Component);
