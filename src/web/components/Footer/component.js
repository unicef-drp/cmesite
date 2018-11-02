import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import messages from './messages';
import igmeLogo from '../../../assets/igme-logo.png';
import unicefLogo from '../../../assets/unicef-black-logo.png';
import whoLogo from '../../../assets/who-black-logo.png';
import unLogo from '../../../assets/un-black-logo.png';
import wboLogo from '../../../assets/wbo-black-logo.png';

const style = theme => ({
  footer: {
    padding: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 10,
    paddingRight: theme.spacing.unit * 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      justifyContent: 'center',
    },
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    flexGrow: 1,
  },
  logo: {
    height: 30,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
});

const Footer = ({ classes }) => (
  <footer className={classes.footer}>
    <div className={classes.item}>
      <img src={igmeLogo} className={classes.logo} />
      <img src={unicefLogo} className={classes.logo} />
      <img src={whoLogo} className={classes.logo} />
      <img src={unLogo} className={classes.logo} />
      <img src={wboLogo} className={classes.logo} />
    </div>
    <div className={classes.item}>
      <Button className={classes.button}>
        <FormattedMessage {...messages.about} />
      </Button>
      <Button className={classes.button}>
        <FormattedMessage {...messages.legals} />
      </Button>
      <Button className={classes.button}>
        <FormattedMessage {...messages.contact} />
      </Button>
    </div>
  </footer>
);

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(Footer);
