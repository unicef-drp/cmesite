import React from 'react';
import PropTypes from 'prop-types';
import { map, addIndex } from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const styles = () => ({
  list: {
    width: '100%',
  },
  checkbox: {
    width: 'initial',
    height: 'initial',
  },
});

const DataDimension = ({ classes, dimension, changeSelection }) => (
  <List className={classes.list}>
    {addIndex(map)(({ id, label, isSelected }, index) => (
      <ListItem
        key={id}
        dense
        button
        onClick={() => changeSelection(dimension.index, index)}
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
    ))(dimension.values)}
  </List>
);

DataDimension.propTypes = {
  classes: PropTypes.object.isRequired,
  dimension: PropTypes.object.isRequired,
  changeSelection: PropTypes.func.isRequired,
};

export default withStyles(styles)(DataDimension);
