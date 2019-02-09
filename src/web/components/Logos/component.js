import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { equals, map } from 'ramda';
import { withStyles } from '@material-ui/core';
import { LOGOS } from '../../constants';
import igmeLogo from '../../../assets/igme-logo.png';
import unicefLogo from '../../../assets/unicef-black-logo.jpg';
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
  big: {
    height: 100,
  },
});

const data = [
  { href: LOGOS.unicef, logo: unicefLogo },
  { href: LOGOS.who, logo: whoLogo },
  { href: LOGOS.un, logo: unLogo },
  { href: LOGOS.wbo, logo: wboLogo },
];

const Logos = ({ hasMainLogo, classes, size }) => (
  <React.Fragment>
    {hasMainLogo && <img src={igmeLogo} className={classes.igmeLogo} />}
    {map(
      ({ href, logo }) => (
        <a key={href} href={href} target="_blank" rel="noopener noreferrer">
          <img
            src={logo}
            className={classNames(classes.logo, { [classes.big]: equals('big', size) })}
          />
        </a>
      ),
      data,
    )}
  </React.Fragment>
);

Logos.propTypes = {
  hasMainLogo: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  size: PropTypes.string,
};

export default withStyles(style)(Logos);
