import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core';
import { LOGOS } from '../../constants';
import igmeLogo from '../../../assets/igme-logo.png';
import unicefLogo from '../../../assets/unicef-black-logo.png';
import whoLogo from '../../../assets/who-black-logo.png';
import unLogo from '../../../assets/un-black-logo.png';
import wboLogo from '../../../assets/wbo-black-logo.png';

const style = theme => ({
  igmeLogo: {
    height: 30,
    marginLeft: 0,
    marginRight: theme.spacing.unit,
  },
  logo: {
    height: 50,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

const Logos = ({ hasMainLogo, classes }) => (
  <React.Fragment>
    {hasMainLogo && <img src={igmeLogo} className={classes.igmeLogo} />}
    <a href={LOGOS.unicef} target="_blank" rel="noopener noreferrer">
      <img src={unicefLogo} className={classes.logo} />
    </a>
    <a href={LOGOS.who} target="_blank" rel="noopener noreferrer">
      <img src={whoLogo} className={classes.logo} />
    </a>
    <a href={LOGOS.un} target="_blank" rel="noopener noreferrer">
      <img src={unLogo} className={classes.logo} />
    </a>
    <a href={LOGOS.wbo} target="_blank" rel="noopener noreferrer">
      <img src={wboLogo} className={classes.logo} />
    </a>
  </React.Fragment>
);

Logos.propTypes = {
  hasMainLogo: PropTypes.bool,
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(Logos);
