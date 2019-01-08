import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { map, isNil, path, toPairs, pipe, pick, propOr, not } from 'ramda';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import DescriptionIcon from '@material-ui/icons/Description';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import routes, { getPath } from '../../routes';
import Wrapper from '../Wrapper';
import { LOCALES } from '../../constants';

const style = theme => ({
  reports: {
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4,
  },
  wrapper: {
    backgroundColor: theme.palette.secondary.main,
  },
  secondaryWrapper: {
    backgroundColor: theme.palette.secondary.dark,
  },
  container: {
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4,
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: theme.palette.primary.light,
    margin: theme.spacing.unit * 2,
    width: 340,
    minHeight: 180,
  },
  secondaryCard: {
    backgroundColor: theme.palette.secondary.dark,
    margin: 0,
    marginBottom: theme.spacing.unit * 2,
  },
  content: {
    backgroundColor: theme.palette.secondary.main,
    border: `1px solid ${theme.palette.primary.light}`,
  },
  secondaryContent: {
    backgroundColor: theme.palette.secondary.dark,
    border: 'none',
  },
  media: {
    margin: theme.spacing.unit * 2,
    paddingLeft: '35%',
    width: 0,
    height: 180,
  },
  action: {
    display: 'flex',
    justifyContent: 'center',
  },
  typo: {
    color: theme.palette.primary.dark,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
});

const getFiles = pipe(propOr({}, 'acf'), pick(LOCALES), toPairs);

const Reports = ({ classes, reports, isSecondary }) => (
  <Wrapper classes={{ root: classes[isSecondary ? 'secondaryWrapper' : 'wrapper'] }}>
    <div className={classes.reports}>
      <Typography variant="headline" align="center" className={classes.typo}>
        <FormattedMessage {...messages.title} />
      </Typography>
      <div className={classes.container}>
        {map(report => {
          const image = path(['acf', 'image'])(report);
          return (
            <Card
              key={report.id}
              className={classNames(classes.card, {
                [classes.secondaryCard]: isSecondary,
              })}
              elevation={0}
              square
            >
              {isNil(image) ? null : (
                <CardMedia
                  className={classes.media}
                  image={report.acf.image.url}
                  title={report.acf.image.alt}
                />
              )}
              <CardContent
                className={classNames(classes.content, {
                  [classes.secondaryContent]: isSecondary,
                })}
              >
                <Typography variant="body2" className={classes.typo} paragraph>
                  {path(['title', 'rendered'])(report)}
                </Typography>
                {map(([locale, file]) => {
                  if (not(file)) return null;
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
                      <FormattedMessage {...messages[locale]} />
                    </Button>
                  );
                }, getFiles(report))}
              </CardContent>
            </Card>
          );
        })(reports)}
      </div>
      {isSecondary ? (
        <div className={classes.action}>
          <Button variant="contained" color="primary" component={Link} to={getPath(routes.reports)}>
            <FormattedMessage {...messages.action} />
          </Button>
        </div>
      ) : null}
    </div>
  </Wrapper>
);

Reports.propTypes = {
  classes: PropTypes.object.isRequired,
  reports: PropTypes.array,
  isSecondary: PropTypes.bool,
};

Reports.defaultProps = {
  reports: [],
};

export default withStyles(style)(Reports);
