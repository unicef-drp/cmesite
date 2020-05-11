import React from 'react';
import PropTypes from 'prop-types';
import { map, equals, addIndex } from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import { FormattedMessage } from 'react-intl';
import Wrapper from '../Wrapper';

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

const Component = ({
  classes,
  theme,
  tabs,
  activeTab,
  changeActiveTab,
  messages,
  commonProps = {},
}) => (
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
      disableLazyLoading={false}
      //animateHeight
    >
      {addIndex(map)(
        (tab, index) => (
          <tab.component
            key={tab.key}
            type={tab.key}
            {...commonProps}
            {...tab.otherProps}
            isActive={equals(activeTab, index)}
          />
        ),
        tabs,
      )}
    </SwipeableViews>
  </React.Fragment>
);

Component.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  activeTab: PropTypes.number.isRequired,
  changeActiveTab: PropTypes.func.isRequired,
  messages: PropTypes.object.isRequired,
  tabs: PropTypes.array.isRequired,
  commonProps: PropTypes.object,
};

export default withStyles(style, { withTheme: true })(Component);
