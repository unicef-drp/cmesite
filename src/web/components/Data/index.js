import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getActiveTab } from '../../selectors/data';
import { changeActiveTab } from '../../ducks/data';
import Component from './component';

export default compose(
  connect(createStructuredSelector({ activeTab: getActiveTab }), {
    changeActiveTab,
  }),
)(Component);
