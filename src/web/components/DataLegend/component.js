import React from 'react';
import PropTypes from 'prop-types';
import {
  map,
  addIndex,
  isNil,
  always,
  ifElse,
  join,
  pipe,
  pick,
  values,
  prop,
  propOr,
  sortBy,
  reverse,
  toPairs,
  indexBy,
  path,
  isEmpty,
  indexOf,
  concat,
  propEq,
} from 'ramda';
import classnames from 'classnames';
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
import {
  getSymbol,
  getSeriesMethodSymbol,
  getSymbolFill,
  getColor,
  isEstimate,
} from '../Chart/utils';
import {
  RELEVANT_DIMENSIONS,
  SERIES_METHOD,
  SERIES_YEAR,
  INCLUDED,
  EXCLUDED,
} from '../../constants';

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
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  selectedItem: {
    backgroundColor: theme.palette.secondary.dark,
  },
});

const DataLegend = ({
  classes,
  theme,
  highlightSerie,
  highlightMethod,
  highlightedMethods,
  estimateSeries = [],
  uncertaintySeries = [],
  mergedSeries = {},
  isCompare,
  seriesNames = [],
}) => {
  const SIZE = 60;

  const itemFactory = isUncertainty =>
    ifElse(
      isNil,
      always(null),
      addIndex(map)(({ id, name, type, isHighlighted, ...serie }, index) => (
        <ListItem
          className={classnames(classes.item, { [classes.selectedItem]: isHighlighted })}
          key={id}
          dense
          //button
          onClick={() => highlightSerie(id)}
        >
          <ListItemIcon>
            {isEstimate(type) && !isUncertainty ? (
              <RemoveIcon
                style={{
                  color: getColor({ type: isCompare ? null : type, index, theme, isUncertainty }),
                  fontSize: 30,
                }}
              />
            ) : (
              <svg width={SIZE / 2} height={SIZE / 2}>
                <path
                  d={
                    isUncertainty
                      ? getSymbol({ size: SIZE * 4, shape: 'square' })()
                      : getSeriesMethodSymbol({
                          size: SIZE * 2,
                          method: prop(SERIES_METHOD, serie),
                        })()
                  }
                  transform={`translate(${SIZE / 4}, ${SIZE / 4})`}
                  stroke={getColor({
                    type: isCompare ? null : type,
                    index: indexOf(name, seriesNames),
                    theme,
                    isUncertainty,
                  })}
                  fill={getSymbolFill(indexOf(name, seriesNames), theme, isUncertainty)(
                    isCompare ? null : type,
                  )}
                />
              </svg>
            )}
          </ListItemIcon>
          <ListItemText>
            {isCompare ? (
              join(' ', [...pipe(pick(RELEVANT_DIMENSIONS), values)(serie), name])
            ) : isUncertainty ? (
              <FormattedMessage {...messages.uncertainty} />
            ) : (
              name
            )}
          </ListItemText>
        </ListItem>
      )),
    );

  const otherSeries = concat(
    propOr([], INCLUDED, mergedSeries),
    propOr([], EXCLUDED, mergedSeries),
  );
  const methods = toPairs(indexBy(prop(SERIES_METHOD), otherSeries));
  const otherLegendItems = reverse(sortBy(pipe(prop(SERIES_YEAR), Number), otherSeries));

  return (
    <React.Fragment>
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
            <FormattedMessage {...messages.titleSources} />
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails classes={{ root: classes.panelDetails }}>
          <List className={classes.list}>
            {itemFactory()(estimateSeries)}
            {itemFactory(true)(uncertaintySeries)}
            {itemFactory()(otherLegendItems)}
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      {isEmpty(methods) ? null : (
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
              <FormattedMessage {...messages.titleMethods} />
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails classes={{ root: classes.panelDetails }}>
            <List className={classes.list}>
              {map(
                ([method, serie]) => (
                  <ListItem
                    className={classnames(classes.item, {
                      [classes.selectedItem]: propEq(method, true, highlightedMethods),
                    })}
                    key={method}
                    dense
                    //button
                    onClick={() => highlightMethod(method)}
                  >
                    <ListItemIcon>
                      <svg width={SIZE / 2} height={SIZE / 2}>
                        <path
                          d={getSeriesMethodSymbol({ size: SIZE * 2, method })()}
                          transform={`translate(${SIZE / 4}, ${SIZE / 4})`}
                          stroke={theme.palette.secondary.darker}
                          fill={theme.palette.secondary.darker}
                        />
                      </svg>
                    </ListItemIcon>
                    <ListItemText>
                      {path(['datapoints', 0, SERIES_METHOD, 'valueName'], serie)}
                    </ListItemText>
                  </ListItem>
                ),
                methods,
              )}
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )}
    </React.Fragment>
  );
};

DataLegend.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  estimateSeries: PropTypes.array,
  uncertaintySeries: PropTypes.array,
  mergedSeries: PropTypes.object,
  isCompare: PropTypes.bool,
  serieNames: PropTypes.array,
  highlightSerie: PropTypes.func.isRequired,
  highlightMethod: PropTypes.func.isRequired,
  highlightedMethods: PropTypes.object.isRequired,
  seriesNames: PropTypes.array,
};

export default withStyles(styles, { withTheme: true })(DataLegend);
