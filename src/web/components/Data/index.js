import { compose, branch, renderComponent, withHandlers, withProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getActiveTab, getIsLoadingStructure } from '../../selectors/data';
import { changeActiveTab as changeActiveTabCreator } from '../../ducks/data';
import Loader from '../Loader';
import Tabs from '../Tabs';
import messages from './messages';
import CountryTab from './country';
import CompareTab from './compare';
import MapTab from './map';
import DownloadTab from './download';
import countryIcon from '../../../assets/country-tab.png';
import compareIcon from '../../../assets/compare-tab.png';
import mapIcon from '../../../assets/map-tab.png';
import downloadIcon from '../../../assets/download-tab.png';

const tabs = [
  { key: 'country', icon: countryIcon, component: CountryTab },
  { key: 'compare', icon: compareIcon, component: CompareTab },
  { key: 'map', icon: mapIcon, component: MapTab },
  { key: 'download', icon: downloadIcon, component: DownloadTab },
];

export default compose(
  withRouter,
  connect(
    createStructuredSelector({
      activeTab: getActiveTab,
      isLoadingStructure: getIsLoadingStructure,
    }),
    { changeActiveTabCreator },
  ),
  branch(({ isLoadingStructure }) => isLoadingStructure, renderComponent(Loader)),
  withHandlers({
    changeActiveTab: ({ history, changeActiveTabCreator }) => value => {
      changeActiveTabCreator(value);
      history.push('/data'); // reset country name is url
    },
  }),
  withProps({ tabs, messages }),
)(Tabs);
