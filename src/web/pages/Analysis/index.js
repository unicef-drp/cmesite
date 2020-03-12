import { compose, withProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import messages from './messages';
import { getActiveTab } from '../../selectors/analysis';
import { changeActiveTab } from '../../ducks/analysis';
import Tabs from '../../components/Tabs';
import Analysis from '../../components/Analysis';
// import Progress from '../../components/AnalysisProgress';
import progressIcon from '../../../assets/progress-tab.png';
import disparityIcon from '../../../assets/disparity-tab.png';
import sdgIcon from '../../../assets/sdg-tab.png';

const tabs = [
  { key: 'progress', icon: progressIcon, component: Analysis },
  { key: 'disparity', icon: disparityIcon, component: () => 'disparity' },
  { key: 'sdg', icon: sdgIcon, component: () => 'sdg' },
];

export default compose(
  connect(createStructuredSelector({ activeTab: getActiveTab }), { changeActiveTab }),
  withProps({ tabs, messages }),
)(Tabs);
