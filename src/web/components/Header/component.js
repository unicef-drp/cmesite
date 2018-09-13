import React from 'react';
import PropTypes from 'prop-types';
import { map, prop } from 'ramda';
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
import { withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { allRoutes, getPath } from '../../routes';
import unigmeLogo from '../../../assets/unicef-logo.png';

const style = theme => ({
  toolbar: {
    paddingLeft: theme.spacing.unit * 10,
    paddingRight: theme.spacing.unit * 10,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
  logo: {
    height: 30,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  typo: {
    color: theme.palette.primary.dark,
  },
  titlebar: {
    backgroundColor: theme.palette.secondary.main,
  },
  menubar: {
    top: theme.spacing.unit * 8,
  },
  selectedMenu: {
    border: `1px solid ${theme.palette.secondary.main}`,
    color: `${theme.palette.secondary.main}!important`,
  },
});

class Header extends React.Component {
  state = { isDrawerOpen: false };

  handleOpen = () => this.setState({ isOpen: true });
  handleClose = () => this.setState({ isOpen: false });

  render = () => {
    const { classes, routeName } = this.props;

    return (
      <React.Fragment>
        <AppBar position="fixed" className={classes.titlebar}>
          <Toolbar disableGutters className={classes.toolbar}>
            <img src={unigmeLogo} className={classes.logo} />
            <Hidden xsDown>
              <Typography variant="title" className={classes.typo}>
                <FormattedMessage {...messages.title} />
              </Typography>
            </Hidden>
            <Hidden smUp>
              <IconButton color="primary" onClick={this.handleOpen}>
                <MenuIcon />
              </IconButton>
            </Hidden>
          </Toolbar>
        </AppBar>
        <Hidden xsDown>
          <AppBar position="fixed" className={classes.menubar}>
            <Toolbar disableGutters className={classes.toolbar}>
              {map(route => (
                <Button
                  color="inherit"
                  key={prop('name')(route)}
                  component={Link}
                  to={getPath(route)}
                  disabled={routeName === prop('name')(route)}
                  classes={{ disabled: classes.selectedMenu }}
                >
                  <FormattedMessage {...prop(prop('name')(route))(messages)} />
                </Button>
              ))(allRoutes)}
            </Toolbar>
          </AppBar>
        </Hidden>
        <Drawer
          open={this.state.isOpen}
          onClose={this.handleClose}
          anchor="top"
        >
          <List component="nav">
            {map(route => (
              <ListItem
                button
                key={prop('name')(route)}
                component={Link}
                to={getPath(route)}
                disabled={routeName === prop('name')(route)}
              >
                <ListItemText>
                  <FormattedMessage {...prop(prop('name')(route))(messages)} />
                </ListItemText>
              </ListItem>
            ))(allRoutes)}
          </List>
        </Drawer>
      </React.Fragment>
    );
  };
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  routeName: PropTypes.string,
};

export default withStyles(style)(Header);
