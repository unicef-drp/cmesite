import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import DataDimension from '../DataDimension';
import { isAllDimensionValuesSelected, hasIndeterminateSelection } from '../../utils';

const styles = theme => ({
  panelRoot: {
    '&:last-child': {
      marginBottom: theme.spacing.unit * 2,
    },
  },
  panelSummaryRoot: {
    backgroundColor: theme.palette.secondary.dark,
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
    color: theme.palette.primary.dark,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    fontWeight: 600,
  },
  checkbox: {
    width: 'initial',
    height: 'initial',
    padding: 0,
  },
  buttons: {
    display: 'flex',
  },
  button: {
    textTransform: 'none',
  },
});

const DataDimensions = ({
  classes,
  dimensions,
  changeSelection,
  changeAllSelection,
  isSelectionExclusive,
  dataType,
}) => (
  <React.Fragment>
    {map(({ label, ...dimension }) => (
      <ExpansionPanel key={dimension.id} defaultExpanded classes={{ root: classes.panelRoot }}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          classes={{
            root: classes.panelSummaryRoot,
            content: classes.panelSummaryContent,
            expanded: classes.expanded,
          }}
        >
          {isSelectionExclusive ? (
            <Radio disableRipple disabled classes={{ root: classes.checkbox }} color="primary" />
          ) : (
            <Checkbox
              checked={isAllDimensionValuesSelected(dimension)}
              indeterminate={hasIndeterminateSelection(dimension)}
              onClick={event => {
                event.stopPropagation();
                changeAllSelection(dimension.index, event.target.checked);
              }}
              classes={{ root: classes.checkbox }}
              color="primary"
            />
          )}
          <Typography className={classes.typo}>{label}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails classes={{ root: classes.panelDetails }}>
          <DataDimension
            dimension={dimension}
            changeSelection={changeSelection}
            isSelectionExclusive={isSelectionExclusive}
            dataType={dataType}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ))(dimensions)}
  </React.Fragment>
);

DataDimensions.propTypes = {
  classes: PropTypes.object.isRequired,
  dimensions: PropTypes.array.isRequired,
  changeSelection: PropTypes.func.isRequired,
  changeAllSelection: PropTypes.func.isRequired,
  isSelectionExclusive: PropTypes.bool,
  dataType: PropTypes.string,
};

export default withStyles(styles)(DataDimensions);
