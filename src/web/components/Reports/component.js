import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { map, isNil, path } from 'ramda';
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

const style = theme => ({
  wrapper: {
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing.unit * 4,
    paddingLeft: theme.spacing.unit * 12,
    paddingRight: theme.spacing.unit * 12,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
    },
  },
  homeWrapper: {
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
    borderRadius: 0,
    border: `1px solid ${theme.palette.primary.light}`,
    backgroundColor: theme.palette.primary.light,
    margin: theme.spacing.unit * 2,
    width: 320,
    minHeight: 180,
  },
  homeCard: {
    border: 'none',
    backgroundColor: theme.palette.secondary.dark,
    margin: 0,
    marginBottom: theme.spacing.unit * 2,
  },
  content: {
    backgroundColor: theme.palette.secondary.main,
  },
  homeContent: {
    backgroundColor: theme.palette.secondary.dark,
  },
  media: {
    margin: theme.spacing.unit * 2,
    paddingLeft: '35%',
    width: 0,
  },
  action: {
    display: 'flex',
    justifyContent: 'center',
  },
  typo: {
    color: theme.palette.primary.dark,
  },
});

const Reports = ({ classes, reports, isHome }) => (
  <div
    className={classNames(classes.wrapper, { [classes.homeWrapper]: isHome })}
  >
    <Typography variant="display1" align="center" className={classes.typo}>
      <FormattedMessage {...messages.title} />
    </Typography>
    <div className={classes.container}>
      {map(report => {
        const image = path(['acf', 'image'])(report);
        const file = path(['acf', 'file'])(report);
        return (
          <Card
            key={report.id}
            className={classNames(classes.card, { [classes.homeCard]: isHome })}
            elevation={0}
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
                [classes.homeContent]: isHome,
              })}
            >
              <Typography variant="body2" className={classes.typo} paragraph>
                {path(['title', 'rendered'])(report)}
              </Typography>
              {isNil(file) ? null : (
                <Button
                  color="primary"
                  target="_blank"
                  size="small"
                  href={report.acf.file.url}
                  download
                >
                  <DescriptionIcon />
                  {report.acf.file.description}
                </Button>
              )}
            </CardContent>
          </Card>
        );
      })(reports)}
    </div>
    {isHome ? (
      <div className={classes.action}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={getPath(routes.reports)}
        >
          <FormattedMessage {...messages.action} />
        </Button>
      </div>
    ) : null}
  </div>
);

Reports.propTypes = {
  classes: PropTypes.object.isRequired,
  reports: PropTypes.array,
  isHome: PropTypes.bool,
};

Reports.defaultProps = {
  reports: [],
};

export default withStyles(style)(Reports);
