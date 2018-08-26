import React from 'react';
import PropTypes from 'prop-types';
import { map, values as rvalues } from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

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
  list: {
    width: '100%',
  },
  checkbox: {
    width: 'initial',
    height: 'initial',
  },
  typo: {
    color: theme.palette.primary.dark,
  },
});

const DataDimensions = ({ classes, dimensions, toggleDimensionValue }) => (
  <React.Fragment>
    {map(({ label, values, ...dimension }) => (
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
          <List className={classes.list}>
            {map(({ id, label, isSelected }) => (
              <ListItem
                key={id}
                dense
                button
                onClick={() => toggleDimensionValue(dimension.id, id)}
                className={classes.listItem}
              >
                <Checkbox
                  checked={!!isSelected}
                  tabIndex={-1}
                  disableRipple
                  classes={{ root: classes.checkbox }}
                  color="primary"
                />
                <ListItemText primary={label} />
              </ListItem>
            ))(rvalues(values))}
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ))(rvalues(dimensions))}
  </React.Fragment>
);

DataDimensions.propTypes = {
  classes: PropTypes.object.isRequired,
  dimensions: PropTypes.object.isRequired,
  toggleDimensionValue: PropTypes.func.isRequired,
};

export default withStyles(styles)(DataDimensions);