import { compose, lifecycle } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getActiveTab } from '../../selectors/data';
import { loadData } from '../../ducks/data';
import { TIME_PERIOD } from '../../constants';
import Component from './component';

const componentDid = props => {
  if (props.activeTab !== 1) return;
  props.loadData({ key: 'compare', queryOptions: { dropIds: [TIME_PERIOD], onlyEstimates: true } });
};

export default compose(
  connect(createStructuredSelector({ activeTab: getActiveTab }), { loadData }),
  lifecycle({
    shouldComponentUpdate(nextProps) {
      return nextProps.activeTab === 1;
    },
    componentDidMount() {
      componentDid(this.props);
    },
    componentDidUpdate() {
      componentDid(this.props);
    },
  }),
)(Component);
