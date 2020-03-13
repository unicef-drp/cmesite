import { compose, withProps, branch, renderComponent, lifecycle } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import messages from './messages';
import { getActiveTab } from '../../selectors/analysis';
import { getIsLoadingStructure } from '../../selectors/data';
import { loadStructure } from '../../ducks/data';
import { changeActiveTab } from '../../ducks/analysis';
import Loader from '../../components/Loader';
import Tabs from '../../components/Tabs';
import Analysis from '../../components/Analysis';
import progressIcon from '../../../assets/progress-tab.png';
import disparityIcon from '../../../assets/disparity-tab.png';
import sdgIcon from '../../../assets/sdg-tab.png';

const tabs = [
  { key: 'progress', icon: progressIcon, component: Analysis },
  { key: 'disparity', icon: disparityIcon, component: () => 'disparity' },
  { key: 'sdg', icon: sdgIcon, component: () => 'sdg' },
];

function componentDidMount() {
  this.props.loadStructure();
}

export default compose(
  connect(
    createStructuredSelector({
      isLoadingStructure: getIsLoadingStructure,
      activeTab: getActiveTab,
    }),
    { changeActiveTab, loadStructure },
  ),
  lifecycle({ componentDidMount }),
  branch(({ isLoadingStructure }) => isLoadingStructure, renderComponent(Loader)),
  withProps({ tabs, messages }),
)(Tabs);
