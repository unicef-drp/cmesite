import React from 'react';
import PropTypes from 'prop-types';
import { times } from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LabelIcon from '@material-ui/icons/Label';
import Tooltip from '@material-ui/core/Tooltip';
import Hidden from '@material-ui/core/Hidden';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { getSteps, getInterval } from './utils';

const style = theme => ({
  wrapper: {
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  list: {
    width: 150,
  },
  denseItem: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  denseItemText: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  denseItemTextText: {
    fontWeight: 600,
    color: theme.palette.primary.dark,
  },
  tooltip: {
    background: theme.palette.common.white,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[1],
    fontSize: 11,
    width: 150,
  },
});

const Legend = ({ classes, scale, colors }) => {
  const steps = getSteps(scale);
  const interval = getInterval(scale);

  const invariant = (
    <List className={classes.list} dense>
      {times(
        n => (
          <ListItem key={n} dense disableGutters classes={{ dense: classes.denseItem }}>
            <ListItemIcon>
              <LabelIcon style={{ color: scale(n * interval) }} />
            </ListItemIcon>
            <ListItemText
              classes={{ dense: classes.denseItemText, textDense: classes.denseItemTextText }}
            >
              {`${n * interval} - ${(n + 1) * interval - 1}`}
            </ListItemText>
          </ListItem>
        ),
        steps,
      )}
      <ListItem dense disableGutters classes={{ dense: classes.denseItem }}>
        <ListItemIcon>
          <LabelIcon style={{ color: colors.above }} />
        </ListItemIcon>
        <ListItemText
          classes={{ dense: classes.denseItemText, textDense: classes.denseItemTextText }}
        >
          <FormattedMessage {...messages.max} />
        </ListItemText>
      </ListItem>
      <ListItem dense disableGutters classes={{ dense: classes.denseItem }}>
        <ListItemIcon>
          <LabelIcon style={{ color: colors.none }} />
        </ListItemIcon>
        <ListItemText
          classes={{ dense: classes.denseItemText, textDense: classes.denseItemTextText }}
        >
          <FormattedMessage {...messages.none} />
        </ListItemText>
      </ListItem>
    </List>
  );

  return (
    <React.Fragment>
      <Hidden smDown>
        <div className={classes.wrapper}>{invariant}</div>
      </Hidden>
      <Hidden mdUp>
        <Tooltip title={invariant} classes={{ tooltip: classes.tooltip }}>
          <LabelIcon style={{ color: colors.none }} />
        </Tooltip>
      </Hidden>
    </React.Fragment>
  );
};

Legend.propTypes = {
  classes: PropTypes.object.isRequired,
  scale: PropTypes.func.isRequired,
  colors: PropTypes.object.isRequired,
};

export default withStyles(style)(Legend);
