import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

inputComponent.propTypes = {
  inputRef: PropTypes.func,
};

export const Control = props => (
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

Control.propTypes = {
  innerProps: PropTypes.object,
  selectProps: PropTypes.object,
  children: PropTypes.node,
  innerRef: PropTypes.func,
  inputRef: PropTypes.func,
};

export const Option = props => (
  <ListItem dense button {...props.innerProps}>
    <ListItemText primary={props.children} />
  </ListItem>
);

Option.propTypes = {
  innerProps: PropTypes.object,
  children: PropTypes.node,
};

export const Placeholder = props => (
  <Typography
    variant="body2"
    //color="textSecondary"
    className={props.selectProps.classes.placeholder}
    {...props.innerProps}
  >
    {props.children}
  </Typography>
);

Placeholder.propTypes = {
  innerProps: PropTypes.object,
  children: PropTypes.node,
  selectProps: PropTypes.object,
};

export const SingleCountryValue = props => (
  <Typography
    variant="title"
    {...props.innerProps}
    color="primary"
    className={props.selectProps.classes.singleValue}
  >
    {props.children}
  </Typography>
);

SingleCountryValue.propTypes = {
  innerProps: PropTypes.object,
  children: PropTypes.node,
  selectProps: PropTypes.object,
};

export const SingleValue = props => (
  <Typography
    variant="body2"
    {...props.innerProps}
    className={props.selectProps.classes.singleValue}
  >
    {props.children}
  </Typography>
);

SingleValue.propTypes = {
  innerProps: PropTypes.object,
  children: PropTypes.node,
  selectProps: PropTypes.object,
};

export const ValueContainer = props => (
  <div className={props.selectProps.classes.valueContainer}>{props.children}</div>
);

ValueContainer.propTypes = {
  selectProps: PropTypes.object,
  children: PropTypes.node,
};

export const Menu = props => (
  <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
    {props.children}
  </Paper>
);

Menu.propTypes = {
  selectProps: PropTypes.object,
  innerProps: PropTypes.object,
  children: PropTypes.node,
};
