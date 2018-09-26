import React from 'react';
import PropTypes from 'prop-types';
import { map, addIndex, isNil, always, ifElse } from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { symbolGenerator, getSymbolFill, getColor } from '../Chart/utils';

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
    //borderTop: `1px solid ${theme.palette.secondary.dark}`,
  },
  typo: {
    color: theme.palette.primary.dark,
  },
  list: {
    width: '100%',
    padding: 0,
  },
  item: {
    width: '50%',
  },
});

const DataLegend = ({
  classes,
  theme,
  estimateSeries,
  includedSeries,
  excludedSeries,
}) => {
  const SIZE = 60;

  const itemFactory = ifElse(
    isNil,
    always(null),
    addIndex(map)(({ id, name, type }, index) => (
      <ListItem className={classes.item} key={id} dense button>
        <svg width={SIZE / 2} height={SIZE / 2}>
          <g>
            <path
              d={symbolGenerator(SIZE)()}
              transform={`translate(${SIZE / 4}, ${SIZE / 4})`}
              stroke={getColor(type, index, theme)}
              fill={getSymbolFill(type, index, theme)}
            />
          </g>
        </svg>
        <ListItemText primary={`${name} (${type})`} />
      </ListItem>
    )),
  );

  return (
    <ExpansionPanel classes={{ root: classes.panelRoot }}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        classes={{
          root: classes.panelSummaryRoot,
          content: classes.panelSummaryContent,
          expanded: classes.expanded,
        }}
      >
        <Typography className={classes.typo}>
          <FormattedMessage {...messages.title} />
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails classes={{ root: classes.panelDetails }}>
        <List className={classes.list}>
          {itemFactory(estimateSeries)}
          {itemFactory(includedSeries)}
          {itemFactory(excludedSeries)}
        </List>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

DataLegend.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  estimateSeries: PropTypes.array,
};

export default withStyles(styles, { withTheme: true })(DataLegend);
