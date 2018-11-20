import React from 'react';
import PropTypes from 'prop-types';
import { times } from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LabelIcon from '@material-ui/icons/Label';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { getSteps, getInterval } from './utils';

const style = theme => ({
  list: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: 150,
    [theme.breakpoints.down('xs')]: {
      position: 'initial',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: '100%',
    },
  },
  denseItem: {
    paddingTop: 0,
    paddingBottom: 0,
    [theme.breakpoints.down('xs')]: {
      width: 150,
    },
  },
  denseItemText: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  denseItemTextText: {
    fontWeight: 600,
    color: theme.palette.primary.dark,
  },
});

const Legend = ({ classes, scale, colors }) => {
  const steps = getSteps(scale);
  const interval = getInterval(scale);

  return (
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
};

Legend.propTypes = {
  classes: PropTypes.object.isRequired,
  scale: PropTypes.func.isRequired,
  colors: PropTypes.object.isRequired,
};

export default withStyles(style)(Legend);
