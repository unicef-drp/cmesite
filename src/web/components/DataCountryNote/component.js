import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const styles = theme => ({
  panelExpanded: {
    margin: 0,
  },
  panelSummaryRoot: {
    backgroundColor: theme.palette.secondary.dark,
  },
  panelSummaryContent: {
    minHeight: 24,
    '&$expanded': {
      margin: 0,
      marginTop: theme.spacing.unit * 1.5,
      marginBottom: theme.spacing.unit * 1.5,
    },
  },
  expanded: {
    // panelSummaryExpanded is not apply, expanded is required (MUI bug)
    minHeight: 24,
    margin: 0,
    '&$expanded': {
      minHeight: 24,
    },
  },
  panelDetails: {
    padding: 0,
    //borderTop: `1px solid ${theme.palette.secondary.dark}`,
  },
  typo: {
    color: theme.palette.primary.dark,
  },
});

const Component = ({ classes, note }) => (
  <ExpansionPanel classes={{ expanded: classes.panelExpanded }} elevation={0}>
    <ExpansionPanelSummary
      expandIcon={<ExpandMoreIcon />}
      classes={{
        root: classes.panelSummaryRoot,
        content: classes.panelSummaryContent,
        expanded: classes.expanded,
      }}
    >
      <Typography className={classes.typo}>
        <FormattedMessage {...messages.note} />
      </Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails classes={{ root: classes.panelDetails }}>{note}</ExpansionPanelDetails>
  </ExpansionPanel>
);

Component.propTypes = {
  classes: PropTypes.object.isRequired,
  note: PropTypes.string,
};

export default withStyles(styles)(Component);
