import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'ramda';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { MAP } from '../../api/sdmx';
import { isNotEmpty } from '../../utils';

const styles = theme => ({
  list: {
    width: '100%',
    overflow: 'auto',
    maxHeight: 300,
    padding: 0,
  },
  nestedList: {
    maxHeight: 'initial',
  },
  item: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
  nestedItem: {
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
  },
  text: {
    paddingLeft: theme.spacing.unit,
  },
  checkbox: {
    width: 'initial',
    height: 'initial',
    padding: 0,
  },
});

const Item = ({
  classes,
  dimension,
  changeSelection,
  isSelectionExclusive,
  dataType,
  value,
  isNested,
  isOpen,
}) => (
  <ListItem
    dense
    button
    onClick={() => changeSelection(dimension.index, value.index)}
    className={isNested ? classes.nestedItem : classes.item}
    disabled={value.isDisabled}
  >
    {isSelectionExclusive &&
      !isNotEmpty(value.children) && (
        <Radio
          checked={dataType === MAP ? !!value.isMapSelected : !!value.isSelected}
          tabIndex={-1}
          disableRipple
          classes={{ root: classes.checkbox }}
          color="primary"
        />
      )}

    {!isSelectionExclusive &&
      !isNotEmpty(value.children) && (
        <Checkbox
          checked={!!value.isToggled}
          tabIndex={-1}
          disableRipple
          classes={{ root: classes.checkbox }}
          color="primary"
        />
      )}

    {isNotEmpty(value.children) && (isOpen ? <ExpandLess /> : <ExpandMore />)}
    <ListItemText primary={value.label} className={classes.text} />
  </ListItem>
);

Item.propTypes = {
  classes: PropTypes.object.isRequired,
  dimension: PropTypes.object.isRequired,
  value: PropTypes.object.isRequired,
  changeSelection: PropTypes.func.isRequired,
  isSelectionExclusive: PropTypes.bool,
  isNested: PropTypes.bool,
  isOpen: PropTypes.bool,
  dataType: PropTypes.string,
};

class Nested extends React.Component {
  state = { isOpen: false };

  handleIsOpen = () => this.setState(state => ({ isOpen: !state.isOpen }));

  render() {
    const { classes, value } = this.props;

    return (
      <React.Fragment>
        <Item
          {...this.props}
          value={value}
          isOpen={this.state.isOpen}
          changeSelection={this.handleIsOpen}
        />
        <Collapse in={this.state.isOpen} timeout="auto" unmountOnExit>
          <List className={classnames(classes.list, classes.nestedList)}>
            {map(child => <Item key={child.id} {...this.props} value={child} isNested />)(
              value.children,
            )}
          </List>
        </Collapse>
      </React.Fragment>
    );
  }
}

Nested.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.object.isRequired,
};

const DataDimension = props => (
  <List className={props.classes.list}>
    {map(({ id, ...value }) => {
      if (isNotEmpty(value.children)) return <Nested key={id} {...props} value={value} />;
      return <Item key={id} {...props} value={value} />;
    })(props.dimension.values)}
  </List>
);

DataDimension.propTypes = {
  classes: PropTypes.object.isRequired,
  dimension: PropTypes.object.isRequired,
};

export default withStyles(styles)(DataDimension);
