import { compose, withProps, withStateHandlers } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getMapIndicatorDimension } from '../../selectors/data';
import Component from './component';

const MOCKS = {
  title: 'Progress',
  description: `The world made remarkable progress in child survival in the past few decades, 
    and millions of children have better survival chances than in 1990–5 1 in 26 children died 
    before reaching age five in 2018, compared to 1 in 11 in 1990.
    Despite the global progress in reducing child mortality over the past few decades, 
    an estimated 5.3 million children under age five died in 2018–roughly half of those deaths 
    occurred in sub-Saharan Africa.`,
  indicatorDimension: {
    values: [{ id: 1, label: 'Under-five Mortality' }, { id: 2, label: 'neonatal Mortality' }],
  },
};

export default compose(
  /*connect(
    createStructuredSelector({ indicatorDimension: getMapIndicatorDimension }),
    null,
  ),*/
  withProps({
    indicatorDimension: MOCKS.indicatorDimension,
    title: MOCKS.title,
    description: MOCKS.description,
  }),
  withStateHandlers({ mode: 'map' }, { changeMode: () => mode => ({ mode }) }),
)(Component);
