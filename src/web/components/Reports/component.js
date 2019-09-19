import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  reject,
  map,
  isNil,
  path,
  toPairs,
  pipe,
  pick,
  propOr,
  not,
  contains,
  equals,
  isEmpty,
  length,
  gt,
  or,
  prop,
} from 'ramda';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import CardActionArea from '@material-ui/core/CardActionArea';
import DescriptionIcon from '@material-ui/icons/Description';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import routes, { getPath } from '../../routes';
import Wrapper from '../Wrapper';
import { LOCALES, REPORT_TYPES } from '../../constants';

const HEIGHT = 180;
const WIDTH = 340;

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
    alignItems: 'flex-start',
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: theme.palette.primary.light,
    margin: theme.spacing.unit * 2,
    width: WIDTH,
  },
  area: {
    display: 'flex',
    flexDirection: 'row',
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
    paddingLeft: HEIGHT / 1.4142, // A4 ratio
    height: HEIGHT,
    width: 0,
    margin: theme.spacing.unit * 2,
    alignSelf: 'flex-start',
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
  btnType: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

const getFiles = pipe(propOr({}, 'acf'), pick(LOCALES), reject(equals(false)), toPairs);

const Reports = ({ classes, reports, isSecondary, reportType, changeReportType }) => (
  <Wrapper classes={{ root: classes[isSecondary ? 'secondaryWrapper' : 'wrapper'] }}>
    <div className={classes.reports}>
      <Typography variant="headline" align="center" className={classes.typo}>
        <FormattedMessage {...messages.title} />
      </Typography>
      {changeReportType && (
        <div className={classes.container} style={{ paddingBottom: 0 }}>
          {map(
            type => (
              <Button
                className={classes.btnType}
                key={type}
                variant="contained"
                onClick={() => changeReportType(type)}
                color={equals(type, reportType || 'all') ? 'primary' : 'default'}
              >
                <FormattedMessage {...messages[type]} />
              </Button>
            ),
            REPORT_TYPES,
          )}
        </div>
      )}
      <div className={classes.container}>
        {isEmpty(reports) &&
          reportType && (
            <Typography variant="body1" align="center" className={classes.typo}>
              <FormattedMessage {...messages.none} />
            </Typography>
          )}
        {map(report => {
          const image = path(['acf', 'image'])(report);
          const files = getFiles(report);
          if (isEmpty(files)) return null;
          const hasFiles = gt(length(files), 0);
          const content = (
            <React.Fragment>
              {or(isNil(image), isNil(prop('url', image))) ? null : (
                <CardMedia
                  className={classes.media}
                  image={report.acf.image.url}
                  title={report.acf.image.alt}
                />
              )}
              <CardContent
                className={classnames(classes.content, { [classes.secondaryContent]: isSecondary })}
              >
                <Typography variant="body2" className={classes.typo} paragraph>
                  {path(['title', 'rendered'])(report)}
                </Typography>
                {hasFiles &&
                  map(([locale, file]) => {
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
                        {contains(locale, LOCALES) ? (
                          <FormattedMessage {...messages[locale]} />
                        ) : (
                          locale
                        )}
                      </Button>
                    );
                  }, files)}
              </CardContent>
            </React.Fragment>
          );
          return (
            <Card
              key={report.id}
              className={classnames(classes.card, { [classes.secondaryCard]: isSecondary })}
              elevation={0}
              square
            >
              {hasFiles ? (
                content
              ) : (
                <CardActionArea>
                  <div className={classes.area}>{content}</div>
                </CardActionArea>
              )}
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
  reportType: PropTypes.string,
  changeReportType: PropTypes.func,
};

Reports.defaultProps = {
  reports: [],
};

export default withStyles(style)(Reports);
