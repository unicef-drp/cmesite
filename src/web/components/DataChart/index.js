import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getChartData } from '../../selectors/data';
import Component from './component';

export default compose(
  connect(createStructuredSelector({ data: getChartData })),
)(Component);
