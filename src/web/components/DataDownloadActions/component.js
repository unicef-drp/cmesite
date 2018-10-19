import React from 'react';
import PropTypes from 'prop-types';
import { map, xprod, prop } from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DescriptionIcon from '@material-ui/icons/Description';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { FORMATS, SCOPES } from '../../ducks/data';

const styles = theme => ({
  wrapper: {
    marginBottom: theme.spacing.unit * 2,
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    paddingTop: theme.spacing.unit * 1.5,
    paddingBottom: theme.spacing.unit * 1.5,
  },
  content: {
    padding: 0,
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  typo: {
    color: theme.palette.secondary.main,
  },
  list: {
    width: '100%',
    overflow: 'auto',
    maxHeight: 300,
    padding: 0,
  },
  progress: {
    color: theme.palette.primary.main,
  },
});

const DataDownloadPanel = ({ classes, downloadData, downloadingData }) => (
  <Card square className={classes.wrapper}>
    <CardHeader
      className={classes.header}
      avatar={<DescriptionIcon className={classes.typo} />}
      title={
        <Typography className={classes.typo}>
          <FormattedMessage {...messages.title} />
        </Typography>
      }
    />
    <CardContent className={classes.content}>
      <List className={classes.list}>
        {map(([format, scope]) => {
          const key = `${format}.${scope}`;
          const downloading = prop(key, downloadingData);
          return (
            <ListItem
              key={key}
              dense
              button
              onClick={() => downloadData({ format, scope })}
              disabled={downloading}
              className={classes.item}
              disableRipple
            >
              {downloading && (
                <CircularProgress size={24} className={classes.progress} />
              )}
              {!downloading && <DescriptionIcon className={classes.progress} />}
              <ListItemText>
                <FormattedMessage {...prop(key, messages)} />
              </ListItemText>
            </ListItem>
          );
        })(xprod(FORMATS, SCOPES))}
      </List>
    </CardContent>
  </Card>
);

DataDownloadPanel.propTypes = {
  downloadingData: PropTypes.object,
  downloadData: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DataDownloadPanel);
