import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
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
    paddingLeft: '30%',
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

const Reports = ({ classes, title, reports }) => (
  <div className={classes.wrapper}>
    <Typography variant="display1" align="center" className={classes.typo}>
      {title}
    </Typography>
    <div className={classes.container}>
      {R.map(report => (
        <Card key={report.id} className={classes.card} elevation={0}>
          <CardMedia
            className={classes.media}
            image={report.thumbnail.sourceUrl}
            title={report.thumbnail.altText}
          />
          <CardContent>
            <Typography variant="body2" className={classes.typo} paragraph>
              {report.name}
            </Typography>
            <Button variant="outlined" color="primary" size="small">
              <DescriptionIcon />
              English
            </Button>
          </CardContent>
        </Card>
      ))(reports)}
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
  title: PropTypes.string,
  reports: PropTypes.array,
};

Reports.defaultProps = {
  reports: [],
};

export default withStyles(style)(Reports);
