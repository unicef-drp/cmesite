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
});

const Header = ({ classes, selectedName }) => (
  <React.Fragment>
    <AppBar position="sticky" color="default">
      <Toolbar disableGutters className={classes.toolbar}>
        <img src={unigmeLogo} className={classes.logo} />
        <Hidden xsDown>
          <Typography variant="title" color="primary">
            <FormattedMessage {...messages.title} />
          </Typography>
        </Hidden>
        <Hidden smUp>
          <IconButton color="primary">
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
    <Hidden xsDown>
      <AppBar position="sticky">
        <Toolbar disableGutters className={classes.toolbar}>
          {map(route => (
            <Button
              color="inherit"
              key={prop('name')(route)}
              component={Link}
              to={getPath(route)}
              disabled={selectedName === prop('name')(route)}
            >
              <FormattedMessage {...prop(prop('name')(route))(messages)} />
            </Button>
          ))(allRoutes)}
        </Toolbar>
      </AppBar>
    </Hidden>
  </React.Fragment>
);

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedName: PropTypes.string,
};

export default withStyles(style)(Header);
