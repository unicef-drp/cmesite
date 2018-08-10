import React from 'react';
import PropTypes from 'prop-types';
import { map, isNil, path } from 'ramda';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import DescriptionIcon from '@material-ui/icons/Description';
import withStyles from '@material-ui/core/styles/withStyles';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const style = theme => ({
  wrapper: {
    backgroundColor: theme.palette.secondary.dark,
    padding: theme.spacing.unit * 4,
    paddingLeft: theme.spacing.unit * 12,
    paddingRight: theme.spacing.unit * 12,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
    },
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
    background: 'none',
    paddingBottom: theme.spacing.unit * 2,
    width: 320,
  },
  media: {
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

const Reports = ({ classes, reports }) => (
  <div className={classes.wrapper}>
    <Typography variant="display1" align="center" className={classes.typo}>
      <FormattedMessage {...messages.title} />
    </Typography>
    <div className={classes.container}>
      {map(report => {
        const image = path(['acf', 'image'])(report);
        const file = path(['acf', 'file'])(report);
        return (
          <Card key={report.id} className={classes.card} elevation={0}>
            {isNil(image) ? null : (
              <CardMedia
                className={classes.media}
                image={report.acf.image.url}
                title={report.acf.image.alt}
              />
            )}
            <CardContent>
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
    <div className={classes.action}>
      <Button variant="contained" color="primary">
        <FormattedMessage {...messages.action} />
      </Button>
    </div>
  </div>
);

Reports.propTypes = {
  classes: PropTypes.object.isRequired,
  reports: PropTypes.array,
};

Reports.defaultProps = {
  reports: [],
};

export default withStyles(style)(Reports);
