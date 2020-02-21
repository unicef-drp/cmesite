import { compose, branch, renderComponent, withHandlers } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getActiveTab, getIsLoadingStructure } from '../../selectors/data';
import { changeActiveTab as changeActiveTabCreator } from '../../ducks/data';
import Component from './component';
import Loader from '../Loader';

export default compose(
  withRouter,
  connect(
    createStructuredSelector({
      activeTab: getActiveTab,
      isLoadingStructure: getIsLoadingStructure,
    }),
    { changeActiveTabCreator },
  ),
  branch(({ isLoadingStructure }) => isLoadingStructure, renderComponent(Loader)),
  withHandlers({
    changeActiveTab: ({ history, changeActiveTabCreator }) => value => {
      changeActiveTabCreator(value);
      history.push('/data'); // reset country name is url
    },
  }),
)(Component);
