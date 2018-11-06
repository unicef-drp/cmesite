import { compose, shouldUpdate } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getCountryValue } from '../../selectors/data';
import Component from './component';

export default compose(
  connect(createStructuredSelector({ country: getCountryValue })),
  shouldUpdate(nextProps => nextProps.activeTab === 0),
)(Component);
