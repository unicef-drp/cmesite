import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import messages from './messages';
import Wrapper from '../Wrapper';
import igmeLogo from '../../../assets/igme-logo.png';
import unicefLogo from '../../../assets/unicef-black-logo.png';
import whoLogo from '../../../assets/who-black-logo.png';
import unLogo from '../../../assets/un-black-logo.png';
import wboLogo from '../../../assets/wbo-black-logo.png';
import { EMAIL, LEGAL_LINK } from '../../constants';
import routes, { getPath } from '../../routes';

const style = theme => ({
  container: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    },

    // sticky footer -> https://philipwalton.com/articles/normalizing-cross-browser-flexbox-bugs/
    flexShrink: 0,
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
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

const Footer = ({ classes }) => (
  <Wrapper>
    <div className={classes.container}>
      <div className={classnames(classes.item, classes.itemLeft)}>
        <img src={igmeLogo} className={classes.igmeLogo} />
        <img src={unicefLogo} className={classes.logo} />
        <img src={whoLogo} className={classes.logo} />
        <img src={unLogo} className={classes.logo} />
        <img src={wboLogo} className={classes.logo} />
      </div>
      <div className={classnames(classes.item, classes.itemRight)}>
        <Button className={classes.button} component={Link} to={getPath(routes.about)}>
          <FormattedMessage {...messages.about} />
        </Button>
        <Button className={classes.button} href={LEGAL_LINK} target="_blank">
          <FormattedMessage {...messages.legal} />
        </Button>
        <Button className={classes.button} href={`mailto:${EMAIL}`}>
          <FormattedMessage {...messages.contact} />
        </Button>
      </div>
    </div>
  </Wrapper>
);

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(Footer);
