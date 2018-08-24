import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'ramda';
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

const dimensions = [
  {
    id: 'RATES',
    label: 'Mortality rate',
    values: [
      { id: 1, label: 'Under-five mortality rate' },
      { id: 2, label: 'Infant mortality rate', isSelected: true },
      { id: 3, label: 'Neonatal mortality' },
      { id: 4, label: 'Mortality rate among children aged 5-14' },
    ],
  },
  {
    id: 'SEX',
    label: 'Sex',
    values: [
      { id: 1, label: 'Male' },
      { id: 2, label: 'Female', isSelected: true },
    ],
  },
  {
    id: 'TYPE',
    label: 'Type of data',
    values: [
      { id: 1, label: 'Estimates', isSelected: true },
      { id: 2, label: 'Source data' },
    ],
  },
];

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

const DataDimensions = ({ classes }) => (
  <React.Fragment>
    {map(({ id, label, values }) => (
      <ExpansionPanel
        key={id}
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
                onClick={() => console.log('click')}
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
            ))(values)}
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ))(dimensions)}
  </React.Fragment>
);

DataDimensions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DataDimensions);
