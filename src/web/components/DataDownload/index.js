import { compose, branch, renderComponent } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getIsLoadingStructure } from '../../selectors/data';
import Component from './component';
import DataProgress from '../DataProgress';

export const enhance = compose(
  connect(
    createStructuredSelector({ isLoadingStructure: getIsLoadingStructure }),
  ),
  branch(
    ({ isLoadingStructure }) => isLoadingStructure,
    renderComponent(DataProgress),
  ),
);

export default enhance(Component);
