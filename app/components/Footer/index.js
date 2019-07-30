import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import messages from './messages';
import Wrapper from 'components/Wrapper';
import Logos from 'components/Logos';
import { EMAIL, LEGAL_LINK } from '../../staticConfig';
import routes from '../../routes';
import useStyles from './styles';

const Footer = () => {
  const classes = useStyles();

  return (
    <Wrapper>
      <div className={classes.container}>
        <div className={classnames(classes.item, classes.itemLeft)}>
          <Logos hasMainLogo />
        </div>
        <div className={classnames(classes.item, classes.itemRight)}>
          <Button className={classes.button} component={Link} to={R.prop('path', routes.about)}>
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
}

export default Footer;

