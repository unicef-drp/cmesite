import { compose, withProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import messages from './messages';
import { getActiveTab } from '../../selectors/analysis';
import { changeActiveTab } from '../../ducks/analysis';
import Tabs from '../../components/Tabs';
import Progress from '../../components/AnalysisProgress';
import countryIcon from '../../../assets/country-tab.png';
import compareIcon from '../../../assets/compare-tab.png';

const tabs = [
  { key: 'progress', icon: countryIcon, component: Progress },
  { key: 'disparity', icon: compareIcon, component: () => 'disparity' },
];

export default compose(
  connect(createStructuredSelector({ activeTab: getActiveTab }), { changeActiveTab }),
  withProps({ tabs, messages }),
)(Tabs);
