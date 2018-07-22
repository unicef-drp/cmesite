import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { map, prop } from 'ramda';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import logo from '../../../assets/unicef-logo.png';

const Logo = styled('img')`
  height: 40px;
  padding: 0 16px;
`;

const Header = ({ routes }) => {
  return (
    <Fragment>
      <AppBar position="static" color="default">
        <Toolbar>
          <Logo src={logo} />
          <Typography variant="title" color="inherit">
            <FormattedMessage {...messages.title} />
          </Typography>
        </Toolbar>
      </AppBar>
      <AppBar position="static">
        <Toolbar>
          {map(route => (
            <Button color="inherit" key={prop('name')(route)}>
              <FormattedMessage {...prop(prop('name')(route))(messages)} />
            </Button>
          ))(routes)}
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

Header.propTypes = {
  routes: PropTypes.array,
};

export default Header;
