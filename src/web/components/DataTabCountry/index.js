import { isNil, any, path } from 'ramda';
import { compose, lifecycle } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
  getCountryValue,
  getIndicatorValue,
  getSexValue,
  getActiveTab,
} from '../../selectors/data';
import { loadData } from '../../ducks/data';
import { TIME_PERIOD } from '../../constants';
import Component from './component';

const componentDid = props => {
  if (props.activeTab !== 0) return;
  if (any(isNil, [props.country, props.indicator, props.sex])) return;
  props.loadData({ key: 'country', queryOptions: { dropIds: [TIME_PERIOD], isExclusive: true } });
};

export default compose(
  connect(
    createStructuredSelector({
      country: getCountryValue,
      indicator: getIndicatorValue,
      sex: getSexValue,
      activeTab: getActiveTab,
    }),
    { loadData },
  ),
  lifecycle({
    shouldComponentUpdate(nextProps) {
      return (
        nextProps.activeTab === 0 &&
        (path(['country', 'id'], this.props) !== path(['country', 'id'], nextProps) ||
          path(['indicator', 'id'], this.props) !== path(['indicator', 'id'], nextProps) ||
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
