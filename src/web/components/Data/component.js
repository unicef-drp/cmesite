import React from 'react';
import PropTypes from 'prop-types';
import { map, equals } from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import CountryTab from './country';
import CompareTab from './compare';
import MapTab from './map';
import DownloadTab from './download';
import Wrapper from '../Wrapper';
import countryIcon from '../../../assets/country-tab.png';
import compareIcon from '../../../assets/compare-tab.png';
import mapIcon from '../../../assets/map-tab.png';
import downloadIcon from '../../../assets/download-tab.png';

const style = theme => ({
  wrapper: {
    backgroundColor: theme.palette.secondary.light,
  },
  tabRoot: {
    minHeight: 48,
  },
  tabWrapper: {
    flexDirection: 'row',
  },
  tabTypo: {
    textTransform: 'none',
  },
  tabIcon: {
    height: 30,
  },
  tabLabelIcon: {
    padding: 0,
  },
  tabLabelContainer: {
    width: 'initial',
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
});

const tabs = [
  { key: 'country', icon: countryIcon },
  { key: 'compare', icon: compareIcon },
  { key: 'map', icon: mapIcon },
  { key: 'download', icon: downloadIcon },
];

const Data = ({ classes, theme, activeTab, changeActiveTab }) => (
  <React.Fragment>
    <AppBar position="static" color="default">
      <Wrapper classes={{ root: classes.wrapper }}>
        <Tabs
          value={activeTab}
          onChange={(event, value) => changeActiveTab(value)}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          {map(tab => (
            <Tab
              key={tab.key}
              label={
                <Hidden smDown>
                  <Typography variant="body2" className={classes.tabTypo}>
                    <FormattedMessage {...messages[tab.key]} />
                  </Typography>
                </Hidden>
              }
              icon={<img className={classes.tabIcon} src={tab.icon} />}
              classes={{
                root: classes.tabRoot,
                wrapper: classes.tabWrapper,
                labelIcon: classes.tabLabelIcon,
                labelContainer: classes.tabLabelContainer,
              }}
            />
          ))(tabs)}
        </Tabs>
      </Wrapper>
    </AppBar>
    <SwipeableViews
      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
      index={activeTab}
      onChangeIndex={index => changeActiveTab(index)}
      //animateHeight
    >
      <CountryTab isActive={equals(activeTab, 0)} />
      <CompareTab isActive={equals(activeTab, 1)} />
      <MapTab isActive={equals(activeTab, 2)} />
      <DownloadTab isActive={equals(activeTab, 3)} />
    </SwipeableViews>
  </React.Fragment>
);

Data.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  activeTab: PropTypes.number.isRequired,
  changeActiveTab: PropTypes.func.isRequired,
};

export default withStyles(style, { withTheme: true })(Data);
