import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import * as R from 'ramda';
import Grid from '@material-ui/core/Grid';
import useStyles from './styles';
import { LOGOS, IGME_LOGO } from '../../staticConfig';

const Logos = ({ hasMainLogo, size }) => {
  const classes = useStyles();
  
  return (
    <React.Fragment>
      {hasMainLogo && <img src={IGME_LOGO.img} className={classes.igmeLogo} />}
      {R.map(
        ({ href, img }) => (
          <a key={href} href={href} target="_blank" rel="noopener noreferrer">
            <img
              src={img}
              className={classnames(classes.logo, { [classes.big]: R.equals('big', size) })}
            />
          </a>
        ),
        LOGOS,
      )}
    </React.Fragment>
  );
}

Logos.propTypes = {
  hasMainLogo: PropTypes.bool,
  size: PropTypes.string,
};

export default Logos;
