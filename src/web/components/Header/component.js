import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { map, prop } from 'ramda';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import logo from '../../../assets/unicef-logo.png';

const Logo = styled('img')`
  height: 40px;
  margin: 30px;
  margin-left: 0;
`;

const Header = ({ routes }) => {
  return (
    <Fragment>
      <AppBar position="static" color="default">
        <Grid container justify="center">
          <Grid item xs={10}>
            <Toolbar disableGutters>
              <Logo src={logo} />
              <Typography variant="title" color="primary">
                <FormattedMessage {...messages.title} />
              </Typography>
            </Toolbar>
          </Grid>
        </Grid>
      </AppBar>
      <AppBar position="sticky">
        <Grid container justify="center">
          <Grid item xs={10}>
            <Toolbar disableGutters>
              {map(route => (
                <Button color="inherit" key={prop('name')(route)}>
                  <FormattedMessage {...prop(prop('name')(route))(messages)} />
                </Button>
              ))(routes)}
            </Toolbar>
          </Grid>
        </Grid>
      </AppBar>
    </Fragment>
  );
};

Header.propTypes = {
  routes: PropTypes.array,
};

export default Header;
