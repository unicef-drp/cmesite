import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { FormattedMessage } from 'react-intl';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import useStyles from './styles';
import { Link } from 'react-router-dom';
import Wrapper from 'components/Wrapper';
import messages from './messages';
import { allRoutes } from '../../routes';
import { IGME_LOGO } from '../../staticConfig';

function Header({ routePath }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.titlebar}>
        <Wrapper>
          <Toolbar disableGutters className={classes.toolbar}>
            <img src={IGME_LOGO.img} className={classes.logo} />
            <Hidden xsDown>
              <Typography variant="subtitle1" className={classes.typo}>
                <FormattedMessage {...messages.title} />
              </Typography>
            </Hidden>
            <Hidden smUp>
              <IconButton color="primary" onClick={() => setIsDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
            </Hidden>
          </Toolbar>
        </Wrapper>
      </AppBar>
      <Hidden xsDown>
        <AppBar position="fixed" className={classes.menubar}>
          <Wrapper>
            <Toolbar disableGutters className={classes.toolbar}>
              {R.map(route => (
                <Button
                  color="inherit"
                  key={route.name}
                  component={Link}
                  to={route.path}
                  disabled={routePath === route.path}
                  classes={{ disabled: classes.selectedMenu }}
                >
                  <FormattedMessage {...R.prop(route.name, messages)} />
                </Button>
              ))(allRoutes)}
            </Toolbar>
          </Wrapper>
        </AppBar>
      </Hidden>
      <Drawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        anchor="top"
      >
        <List component="nav">
          {R.map(route => (
            <ListItem
              button
              key={route.name}
              component={Link}
              to={route.path}
              disabled={routePath === route.path}
            >
              <ListItemText>
                <FormattedMessage {...R.prop(route.name, messages)} />
              </ListItemText>
            </ListItem>
          ))(allRoutes)}
        </List>
      </Drawer>
    </React.Fragment>
  );
}

Header.propTypes = {
  routePath: PropTypes.string.isRequired,
};

export default Header;
