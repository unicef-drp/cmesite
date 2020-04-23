import { compose, withProps, branch, renderComponent, lifecycle } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import messages from './messages';
import { getActiveTab } from '../../selectors/analysis';
import { getIsLoadingStructure } from '../../selectors/data';
import { loadStructure } from '../../ducks/data';
import { loadPosts } from '../../ducks/wp';
import { changeActiveTab } from '../../ducks/analysis';
import Loader from '../../components/Loader';
import Tabs from '../../components/Tabs';
import Analysis from '../../components/Analysis';
import progressIcon from '../../../assets/progress-tab.png';
import disparityIcon from '../../../assets/disparity-tab.png';
import sdgIcon from '../../../assets/sdg-tab.png';
import { VIZ_MAP, VIZ_CHART } from '../../constants';

const tabs = [
  { key: 'progress', icon: progressIcon, component: Analysis, otherProps: { vizTypes: [VIZ_MAP] } },
  {
    key: 'disparity',
    icon: disparityIcon,
    component: Analysis,
    otherProps: { vizTypes: [VIZ_CHART] },
  },
  {
    key: 'sdg',
    icon: sdgIcon,
    component: Analysis,
    otherProps: { vizTypes: [VIZ_MAP, VIZ_CHART], isLatest: true },
  },
];

function componentDidMount() {
  this.props.loadStructure();
  this.props.loadPosts('analysis');
}

export default compose(
  connect(
    createStructuredSelector({
      isLoadingStructure: getIsLoadingStructure,
      activeTab: getActiveTab,
    }),
    { changeActiveTab, loadStructure, loadPosts },
  ),
  lifecycle({ componentDidMount }),
  branch(({ isLoadingStructure }) => isLoadingStructure, renderComponent(Loader)),
  withProps({ tabs, messages }),
)(Tabs);
