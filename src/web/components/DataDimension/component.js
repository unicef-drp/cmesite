import React from 'react';
import PropTypes from 'prop-types';
import { map, addIndex } from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';

const styles = theme => ({
  list: {
    width: '100%',
    overflow: 'auto',
    maxHeight: 300,
    padding: 0,
  },
  item: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
  text: {
    paddingLeft: theme.spacing.unit,
  },
  checkbox: {
    width: 'initial',
    height: 'initial',
  },
});

const DataDimension = ({ classes, dimension, changeSelection, isSelectionExclusive }) => (
  <List className={classes.list}>
    {addIndex(map)(({ id, label, isSelected, isToggled, isDisabled }, index) => (
      <ListItem
        key={id}
        dense
        button
        onClick={() => changeSelection(dimension.index, index)}
        className={classes.item}
        disabled={isDisabled}
      >
        {isSelectionExclusive ? (
          <Radio
            checked={!!isSelected}
            tabIndex={-1}
            disableRipple
            classes={{ root: classes.checkbox }}
            color="primary"
          />
        ) : (
          <Checkbox
            checked={!!isToggled}
            tabIndex={-1}
            disableRipple
            classes={{ root: classes.checkbox }}
            color="primary"
          />
        )}
        <ListItemText primary={label} className={classes.text} />
      </ListItem>
    ))(dimension.values)}
  </List>
);

DataDimension.propTypes = {
  classes: PropTypes.object.isRequired,
  dimension: PropTypes.object.isRequired,
  changeSelection: PropTypes.func.isRequired,
  isSelectionExclusive: PropTypes.bool,
};

export default withStyles(styles)(DataDimension);
