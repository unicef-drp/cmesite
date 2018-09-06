import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'ramda';
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
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import DataCountry from '../DataCountry';
import DataCompare from '../DataCompare';
import DataDownload from '../DataDownload';
import DataNotes from '../DataNotes';

// temp
import Avatar from '@material-ui/core/Avatar';
import BlurOnIcon from '@material-ui/icons/BlurOn';

const style = theme => ({
  wrapper: {
    paddingLeft: theme.spacing.unit * 12,
    paddingRight: theme.spacing.unit * 12,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
    },
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
});

const tabs = [
  { key: 'country', icon: <PlaceIcon /> },
  { key: 'compare', icon: <CompareArrowsIcon /> },
  { key: 'map', icon: <PublicIcon /> },
  { key: 'download', icon: <DescriptionIcon /> },
];

const Data = ({ classes, theme, activeTab, changeActiveTab }) => (
  <React.Fragment>
    <AppBar position="static" color="default" className={classes.wrapper}>
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
              <Typography variant="body2" className={classes.tabTypo}>
                <FormattedMessage {...messages[tab.key]} />
              </Typography>
            }
            icon={tab.icon}
            classes={{ root: classes.tabRoot, wrapper: classes.tabWrapper }}
          />
        ))(tabs)}
      </Tabs>
    </AppBar>
    <SwipeableViews
      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
      index={activeTab}
      onChangeIndex={index => changeActiveTab(index)}
      animateHeight
    >
      <div className={classes.wrapper}>
        <DataCountry />
      </div>
      <div className={classes.wrapper}>
        <DataCompare />
      </div>
      <div
        style={{
          height: 300,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Avatar>
          <BlurOnIcon />
        </Avatar>
      </div>
      <div className={classes.wrapper}>
        <DataDownload />
      </div>
    </SwipeableViews>
    <DataNotes />
  </React.Fragment>
);

Data.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  activeTab: PropTypes.number.isRequired,
  changeActiveTab: PropTypes.func.isRequired,
};

export default withStyles(style, { withTheme: true })(Data);
