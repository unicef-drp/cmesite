import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DescriptionIcon from '@material-ui/icons/Description';
import { LOCALES } from '../../staticConfig';
import useStyles from './styles';
import messages from './messages';

const Report = ({ acf = {}, title, isSecondary }) => {
  const classes = useStyles();

  return (
    <Card
      className={classnames(classes.card, {[classes.secondaryCard]: isSecondary})}
      elevation={0}
      square
    >
      {acf.image && (
        <CardMedia
          className={classes.media}
          image={acf.image.url}
          title={acf.image.alt}
        />
      )}
      <CardContent
        className={classnames(classes.content, {
          [classes.secondaryContent]: isSecondary,
        })}
      >
        <Typography variant="body1" className={classes.typo} paragraph>
          {title.rendered}
        </Typography>
        {R.map(([locale, file]) => {
          if (R.not(file)) return null;
          return (
            <Button
              key={locale}
              color="primary"
              target="_blank"
              size="small"
              href={file.url}
              download
            >
              <DescriptionIcon className={classes.leftIcon} />
              {R.contains(locale, LOCALES) ? (
                <FormattedMessage {...messages[locale]} />
              ) : (
                locale
              )}
            </Button>
          );
        }, R.pipe(R.pick(LOCALES), R.toPairs)(acf))}
      </CardContent>
    </Card>
  );
}

Report.propTypes = {
  acf: PropTypes.object,
  title: PropTypes.object,
  isSecondary: PropTypes.bool,
};

export default Report;
