import React from 'react';
import PropTypes from 'prop-types';
import { times, nth, dec, length, inc, equals } from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LabelIcon from '@material-ui/icons/Label';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const style = theme => ({
  list: {
    padding: 0,
    position: 'absolute',
    left: 0,
    bottom: theme.spacing.unit * -4,
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

const Legend = ({ classes, scale }) => {
  const domain = scale.domain();
  const colors = scale.range();

  return (
    <List className={classes.list} dense>
      {times(
        n => (
          <ListItem key={n} dense disableGutters classes={{ dense: classes.denseItem }}>
            <ListItemIcon>
              <LabelIcon style={{ color: nth(inc(n), colors) }} />
            </ListItemIcon>
            <ListItemText
              classes={{ dense: classes.denseItemText, textDense: classes.denseItemTextText }}
            >
              {equals(n, dec(length(domain))) ? (
                <FormattedMessage {...messages.max} values={{ max: nth(n, domain) }} />
              ) : (
                `${nth(n, domain)} - ${dec(nth(inc(n), domain))}`
              )}
            </ListItemText>
          </ListItem>
        ),
        length(domain),
      )}
      <ListItem dense disableGutters classes={{ dense: classes.denseItem }}>
        <ListItemIcon>
          <LabelIcon style={{ color: scale(-1) }} />
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
};

export default withStyles(style)(Legend);
