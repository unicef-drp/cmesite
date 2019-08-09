import { compose, branch, renderComponent } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getActiveTab, getIsLoadingStructure } from '../../selectors/data';
import { changeActiveTab } from '../../ducks/data';
import Component from './component';
import Loader from '../Loader';

export default compose(
  connect(
    createStructuredSelector({
      activeTab: getActiveTab,
      isLoadingStructure: getIsLoadingStructure,
    }),
    { changeActiveTab },
  ),
  branch(({ isLoadingStructure }) => isLoadingStructure, renderComponent(Loader)),
)(Component);
