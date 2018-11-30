import React from 'react';
import PropTypes from 'prop-types';
import { map, addIndex, isNil, always, ifElse, join, pipe, pick, values } from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import RemoveIcon from '@material-ui/icons/Remove';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { symbolGenerator, getSymbolFill, getColor, isEstimate } from '../Chart/utils';
import { RELEVANT_DIMENSIONS } from '../../constants';

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
  list: {
    width: '100%',
    padding: 0,
    display: 'flex',
    flexWrap: 'wrap',
  },
  item: {
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
});

const DataLegend = ({
  classes,
  theme,
  estimateSeries,
  uncertaintySeries,
  includedSeries,
  excludedSeries,
  isCompare,
}) => {
  const SIZE = 60;

  const itemFactory = isUncertainty =>
    ifElse(
      isNil,
      always(null),
      addIndex(map)(({ id, name, type, ...serie }, index) => (
        <ListItem className={classes.item} key={id} dense button>
          <ListItemIcon>
            {isEstimate(type) ? (
              <RemoveIcon
                style={{
                  color: getColor(isCompare ? null : type, index, theme, isUncertainty),
                  fontSize: 30,
                }}
              />
            ) : (
              <svg width={SIZE / 2} height={SIZE / 2}>
                <g>
                  <path
                    d={symbolGenerator(SIZE, index)()}
                    transform={`translate(${SIZE / 4}, ${SIZE / 4})`}
                    stroke={getColor(isCompare ? null : type, index, theme, isUncertainty)}
                    fill={getSymbolFill(isCompare ? null : type, index, theme, isUncertainty)}
                  />
                </g>
              </svg>
            )}
          </ListItemIcon>
          <ListItemText>
            {isCompare
              ? join(' ', [...pipe(pick(RELEVANT_DIMENSIONS), values)(serie), name])
              : name}
          </ListItemText>
        </ListItem>
      )),
    );

  return (
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
          <FormattedMessage {...messages.title} />
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails classes={{ root: classes.panelDetails }}>
        <List className={classes.list}>
          {itemFactory()(estimateSeries)}
          {itemFactory(true)(uncertaintySeries)}
          {itemFactory()(includedSeries)}
          {itemFactory()(excludedSeries)}
        </List>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

DataLegend.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  estimateSeries: PropTypes.array,
  uncertaintySeries: PropTypes.array,
  includedSeries: PropTypes.array,
  excludedSeries: PropTypes.array,
  isCompare: PropTypes.bool,
};

export default withStyles(styles, { withTheme: true })(DataLegend);
