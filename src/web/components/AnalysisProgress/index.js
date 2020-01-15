import { compose, withProps } from 'recompose';
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
    values: [
      { id: 'MRY0T4', label: 'Under-five Mortality' },
      { id: 2, label: 'Neonatal Mortality' },
    ],
  },
};

export default compose(
  withProps({
    indicatorDimension: MOCKS.indicatorDimension,
    title: MOCKS.title,
    description: MOCKS.description,
  }),
)(Component);
