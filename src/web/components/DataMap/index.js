import { compose, branch, renderComponent } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getIsLoadingStructure, getIsLoadingData } from '../../selectors/data';
import Component from './component';
import Loader from '../Loader';

const enhance = compose(
  connect(
    createStructuredSelector({
      isLoadingStructure: getIsLoadingStructure,
      isLoadingData: getIsLoadingData,
    }),
  ),
  branch(({ isLoadingStructure }) => isLoadingStructure, renderComponent(Loader)),
);

export default enhance(Component);
