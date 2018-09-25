import {
  compose,
  withState,
  withHandlers,
  branch,
  renderComponent,
} from 'recompose';
import { not } from 'ramda';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getTitle, getIsLoadingData } from '../../selectors/data';
import Component from './component';
import DataProgress from '../DataProgress';

export default compose(
  withState('expanded', 'setExpanded', false),
  withHandlers({
    onExpand: ({ setExpanded }) => event => {
      event.preventDefault();
      setExpanded(not);
    },
  }),
  connect(
    createStructuredSelector({
      title: getTitle,
      isLoadingData: getIsLoadingData,
    }),
  ),
  branch(({ isLoadingData }) => isLoadingData, renderComponent(DataProgress)),
)(Component);
