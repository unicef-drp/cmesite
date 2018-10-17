import { compose, branch, renderComponent } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getIsLoadingStructure, getIsLoadingData } from '../../selectors/data';
import Component from './component';
import DataProgress from '../DataProgress';

const enhance = compose(
  connect(
    createStructuredSelector({
      isLoadingStructure: getIsLoadingStructure,
      isLoadingData: getIsLoadingData,
    }),
  ),
  branch(
    ({ isLoadingStructure }) => isLoadingStructure,
    renderComponent(DataProgress),
  ),
);

export default enhance(Component);
