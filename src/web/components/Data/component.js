import React from 'react';
import PropTypes from 'prop-types';
import { map, equals } from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import PlaceIcon from '@material-ui/icons/Place';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import DescriptionIcon from '@material-ui/icons/Description';
import PublicIcon from '@material-ui/icons/Public';
import Hidden from '@material-ui/core/Hidden';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import CountryTab from './country';
import CompareTab from './compare';
import MapTab from './map';
import DownloadTab from './download';
import Wrapper from '../Wrapper';

const style = () => ({
  tabRoot: {
    minHeight: 48,
  },
  tabWrapper: {
    flexDirection: 'row',
  },
  tabTypo: {
    textTransform: 'none',
  },
});

const tabs = [
  { key: 'country', icon: <PlaceIcon /> },
  { key: 'compare', icon: <CompareArrowsIcon /> },
  { key: 'map', icon: <PublicIcon /> },
  { key: 'download', icon: <DescriptionIcon /> },
];

const Data = ({ classes, theme, activeTab, changeActiveTab }) => (
  <React.Fragment>
    <AppBar position="static" color="default">
      <Wrapper>
        <Tabs
          value={activeTab}
          onChange={(event, value) => changeActiveTab(value)}
          indicatorColor="primary"
          textColor="primary"
          fullWidth
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
              icon={tab.icon}
              classes={{ root: classes.tabRoot, wrapper: classes.tabWrapper }}
            />
          ))(tabs)}
        </Tabs>
      </Wrapper>
    </AppBar>
    <SwipeableViews
      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
      index={activeTab}
      onChangeIndex={index => changeActiveTab(index)}
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
