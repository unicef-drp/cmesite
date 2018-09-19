import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getDataSeries } from '../../selectors/data';
import Component from './component';

export default compose(
  connect(createStructuredSelector({ series: getDataSeries })),
)(Component);
