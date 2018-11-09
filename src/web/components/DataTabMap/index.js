import { isNil, any, path } from 'ramda';
import { compose, lifecycle } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getIndicatorValue, getSexValue, getActiveTab } from '../../selectors/data';
import { loadData } from '../../ducks/data';
import { REF_AREA } from '../../constants';
import Component from './component';

const componentDid = props => {
  if (props.activeTab !== 2) return;
  if (any(isNil, [props.indicator, props.sex])) return;
  props.loadData({
    key: 'map',
    queryOptions: { dropIds: [REF_AREA], isExclusive: true, onlyEstimates: true },
    parserOptions: { isMap: true },
  });
};

export default compose(
  connect(
    createStructuredSelector({
      indicator: getIndicatorValue,
      sex: getSexValue,
      activeTab: getActiveTab,
    }),
    { loadData },
  ),
  lifecycle({
    shouldComponentUpdate(nextProps) {
      return (
        nextProps.activeTab === 2 &&
        (path(['indicator', 'id'], this.props) !== path(['indicator', 'id'], nextProps) ||
          path(['sex', 'id'], this.props) !== path(['sex', 'id'], nextProps))
      );
    },
    componentDidMount() {
      componentDid(this.props);
    },
    componentDidUpdate() {
      componentDid(this.props);
    },
  }),
)(Component);
