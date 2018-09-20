import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DataDimension from '../DataDimension';

const styles = theme => ({
  panelRoot: {
    '&:last-child': {
      marginBottom: theme.spacing.unit * 2,
    },
  },
  panelSummaryRoot: {
    minHeight: 0,
  },
  panelSummaryContent: {
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
  },
  typo: {
    color: theme.palette.primary.dark,
  },
});

const DataDimensions = ({ classes, dimensions, toggleDimensionValue }) => (
  <React.Fragment>
    {map(({ label, ...dimension }) => (
      <ExpansionPanel
        key={dimension.id}
        defaultExpanded
        classes={{ root: classes.panelRoot }}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          classes={{
            root: classes.panelSummaryRoot,
            content: classes.panelSummaryContent,
            expanded: classes.expanded,
          }}
        >
          <Typography className={classes.typo}>{label}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails classes={{ root: classes.panelDetails }}>
          <DataDimension
            dimension={dimension}
            toggleDimensionValue={toggleDimensionValue}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ))(dimensions)}
  </React.Fragment>
);

DataDimensions.propTypes = {
  classes: PropTypes.object.isRequired,
  dimensions: PropTypes.array.isRequired,
  toggleDimensionValue: PropTypes.func.isRequired,
};

export default withStyles(styles)(DataDimensions);
