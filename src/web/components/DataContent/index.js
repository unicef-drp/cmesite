import { compose, branch, renderComponent } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getIsLoadingData } from '../../selectors/data';
import Component from './component';
import DataProgress from '../DataProgress';

export default compose(
  connect(
    createStructuredSelector({
      isLoadingData: getIsLoadingData,
    }),
  ),
  branch(({ isLoadingData }) => isLoadingData, renderComponent(DataProgress)),
)(Component);
