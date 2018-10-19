import { compose, branch, renderComponent } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getActiveTab, getIsLoadingStructure } from '../../selectors/data';
import { changeActiveTab } from '../../ducks/data';
import Component from './component';
import DataProgress from '../DataProgress';

export default compose(
  connect(
    createStructuredSelector({
      activeTab: getActiveTab,
      isLoadingStructure: getIsLoadingStructure,
    }),
    { changeActiveTab },
  ),
  branch(
    ({ isLoadingStructure }) => isLoadingStructure,
    renderComponent(DataProgress),
  ),
)(Component);
