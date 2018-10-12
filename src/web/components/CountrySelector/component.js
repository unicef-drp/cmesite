/* eslint-disable react/prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

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

const inputComponent = ({ inputRef, ...props }) => (
  <div ref={inputRef} {...props} />
);

const Control = props => (
  <TextField
    fullWidth
    InputProps={{
      inputComponent,
      classes: { underline: props.selectProps.classes.cssUnderline },
      inputProps: {
        className: props.selectProps.classes.input,
        inputRef: props.innerRef,
        children: props.children,
        ...props.innerProps,
      },
    }}
    {...props.selectProps.textFieldProps}
  />
);

const Option = props => (
  <ListItem dense button {...props.innerProps}>
    <ListItemText primary={props.children} />
  </ListItem>
);

const Placeholder = props => (
  <Typography variant="body2" color="textSecondary" {...props.innerProps}>
    {props.children}
  </Typography>
);

const SingleValue = props => (
  <Typography variant="body2" {...props.innerProps}>
    {props.children}
  </Typography>
);

const ValueContainer = props => (
  <div className={props.selectProps.classes.valueContainer}>{props.children}</div>
);

const Menu = props => (
  <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
    {props.children}
  </Paper>
);

const CountrySelector = ({ classes, value, values, handleValue }) => (
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
      noOptionsMessage={() => <FormattedMessage {...messages.noOption} />}
      placeholder={<FormattedMessage {...messages.placeholder} />}
    />
  </Paper>
);

CountrySelector.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CountrySelector);
