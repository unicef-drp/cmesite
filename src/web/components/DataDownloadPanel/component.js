import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DescriptionIcon from '@material-ui/icons/Description';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const styles = theme => ({
  wrapper: {
    marginBottom: theme.spacing.unit * 2,
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    paddingTop: theme.spacing.unit * 1.5,
    paddingBottom: theme.spacing.unit * 1.5,
  },
  typo: {
    color: theme.palette.secondary.main,
  },
  icon: {
    color: theme.palette.primary.main,
  },
});

const DataDownloadPanel = ({ classes }) => (
  <Card square className={classes.wrapper}>
    <CardHeader
      className={classes.header}
      title={
        <Typography className={classes.typo}>
          <FormattedMessage {...messages.title} />
        </Typography>
      }
    />
    <CardActions>
      <DescriptionIcon className={classes.icon} />
      <Button size="small" color="primary">
        <FormattedMessage {...messages.xml} />
      </Button>
      <Button size="small" color="primary">
        <FormattedMessage {...messages.csv} />
      </Button>
    </CardActions>
  </Card>
);

DataDownloadPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DataDownloadPanel);
