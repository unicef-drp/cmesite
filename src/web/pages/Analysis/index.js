import { pipe, path, replace, isNil, identity, ifElse } from 'ramda';
import { compose, withProps, branch, renderComponent, lifecycle } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import messages from './messages';
import { getActiveTab } from '../../selectors/analysis';
import {
  getIsLoadingStructure,
  getIsLoadingHierarchicalCodelists,
  getHierarchicalCodelists,
} from '../../selectors/data';
import { loadStructure, loadHierarchicalCodelists } from '../../ducks/data';
import { loadPosts } from '../../ducks/wp';
import { changeActiveTab } from '../../ducks/analysis';
import Loader from '../../components/Loader';
import Tabs from '../../components/Tabs';
import Analysis from '../../components/Analysis';
import progressIcon from '../../../assets/progress-tab.png';
import disparityIcon from '../../../assets/disparity-tab.png';
import sdgIcon from '../../../assets/sdg-tab.png';
import { VIZ_MAP, VIZ_CIRCLE, VIZ_PACK, YEAR_TO_ACHIEVE } from '../../constants';

const tabs = [
  { key: 'progress', icon: progressIcon, component: Analysis, otherProps: { vizTypes: [VIZ_MAP] } },
  {
    key: 'disparity',
    icon: disparityIcon,
    component: Analysis,
    otherProps: { vizTypes: [VIZ_CIRCLE], hasHierarchies: true },
  },
  {
    key: 'sdg',
    icon: sdgIcon,
    component: Analysis,
    otherProps: {
      vizTypes: [VIZ_PACK, VIZ_MAP],
      isLatest: true,
      mapProps: {
        valueAccessor: pipe(
          path([YEAR_TO_ACHIEVE, 'valueId']),
          ifElse(isNil, identity, pipe(replace(/[<=>]*/, ''), parseInt)),
        ),
        legendProps: { messageKeyPrefix: 'yta' },
        highlightsProps: {
          hasRefDate: false,
          nameAccessor: path([YEAR_TO_ACHIEVE, 'name']),
          valueNameAccessor: path([YEAR_TO_ACHIEVE, 'valueName']),
        },
      },
    },
  },
];

function componentDidMount() {
  this.props.loadStructure();
  this.props.loadHierarchicalCodelists();
  this.props.loadPosts('analysis');
}

export default compose(
  connect(
    createStructuredSelector({
      isLoadingStructure: getIsLoadingStructure,
      isLoadingHierarchicalCodelists: getIsLoadingHierarchicalCodelists,
      activeTab: getActiveTab,
      hierarchicalCodelists: getHierarchicalCodelists,
    }),
    { changeActiveTab, loadStructure, loadHierarchicalCodelists, loadPosts },
  ),
  lifecycle({ componentDidMount }),
  branch(({ isLoadingStructure }) => isLoadingStructure, renderComponent(Loader)),
  withProps(({ isLoadingHierarchicalCodelists, hierarchicalCodelists }) => ({
    commonProps: { isLoadingHierarchicalCodelists, hierarchicalCodelists },
    tabs,
    messages,
  })),
)(Tabs);
