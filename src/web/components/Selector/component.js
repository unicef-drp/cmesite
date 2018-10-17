import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import {
  Control,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
  Menu,
} from './overrides';

const styles = theme => ({
  input: {
    display: 'flex',
    padding: 0,
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    padding: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  paper: {
    marginTop: theme.spacing.unit,
    position: 'absolute',
    width: '100%',
    zIndex: 10000,
  },
  cssUnderline: {
    '&:after': {
      borderBottomColor: theme.palette.primary.main,
    },
    '&:hover:before': {
      borderBottom: `2px solid ${theme.palette.primary.main} !important`,
    },
  },
});

const Selector = ({ classes, value, values, handleValue, keys }) => (
  <Paper square elevation={1}>
    <Select
      classes={classes}
      options={values}
      components={{
        Control,
        Option,
        NoOptionsMessage: Option,
        Placeholder,
        SingleValue,
        ValueContainer,
        Menu,
      }}
      value={value}
      onChange={handleValue}
      noOptionsMessage={() => <FormattedMessage {...messages[keys.noOptions]} />}
      placeholder={<FormattedMessage {...messages[keys.placeholder]} />}
    />
  </Paper>
);

Selector.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Selector);
