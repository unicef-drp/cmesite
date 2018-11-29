import React from 'react';
import PropTypes from 'prop-types';
import { map, xprod, prop } from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import DescriptionIcon from '@material-ui/icons/Description';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { FORMATS, SCOPES } from '../../ducks/data';

const styles = theme => ({
  panelRoot: {
    '&:last-child': {
      marginBottom: theme.spacing.unit * 2,
    },
  },
  panelSummaryRoot: {
    backgroundColor: theme.palette.primary.main,
    minHeight: 0,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
  panelSummaryContent: {
    alignItems: 'center',
    '&$expanded': {
      margin: 0,
      marginTop: theme.spacing.unit * 1.5,
      marginBottom: theme.spacing.unit * 1.5,
    },
  },
  expanded: {
    // panelSummaryExpanded is not apply, expanded is required (MUI bug)
    '&$expanded': {
      minHeight: 0,
    },
  },
  panelDetails: {
    padding: 0,
    flexDirection: 'column',
    //borderTop: `1px solid ${theme.palette.secondary.dark}`,
  },
  typo: {
    color: theme.palette.secondary.main,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    fontWeight: 600,
  },
  icon: {
    color: theme.palette.secondary.main,
  },
  list: {
    width: '100%',
    overflow: 'auto',
    maxHeight: 300,
    padding: 0,
  },
  item: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
  text: {
    paddingLeft: theme.spacing.unit,
  },
  progress: {
    color: theme.palette.primary.main,
  },
});

const DataDownloadPanel = ({ classes, downloadData, downloadingData }) => (
  <ExpansionPanel defaultExpanded classes={{ root: classes.panelRoot }}>
    <ExpansionPanelSummary
      expandIcon={<ExpandMoreIcon />}
      classes={{
        root: classes.panelSummaryRoot,
        content: classes.panelSummaryContent,
        expanded: classes.expanded,
        expandIcon: classes.icon,
      }}
    >
      <DescriptionIcon className={classes.icon} />
      <Typography className={classes.typo}>
        <FormattedMessage {...messages.title} />
      </Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails classes={{ root: classes.panelDetails }}>
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
              {downloading && <CircularProgress size={24} className={classes.progress} />}
              {!downloading && <DescriptionIcon className={classes.progress} />}
              <ListItemText className={classes.text}>
                <FormattedMessage {...prop(key, messages)} />
              </ListItemText>
            </ListItem>
          );
        })(xprod(FORMATS, SCOPES))}
      </List>
    </ExpansionPanelDetails>
  </ExpansionPanel>
);

DataDownloadPanel.propTypes = {
  downloadingData: PropTypes.object,
  downloadData: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DataDownloadPanel);
