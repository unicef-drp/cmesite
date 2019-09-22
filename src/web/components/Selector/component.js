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
  SingleCountryValue,
  ValueContainer,
  Menu,
  IndicatorsContainer,
} from './overrides';

const styles = theme => ({
  input: {
    display: 'flex',
    padding: 0,
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  indicatorsContainer: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'space-between',
      paddingLeft: theme.spacing.unit * 2,
    },
  },
  valueContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    padding: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    overflow: 'hidden',
  },
  singleValue: {
    textTransform: 'none',
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

const Selector = ({
  classes,
  value,
  values,
  handleValue,
  handleType,
  keys,
  isCountry,
  countryTypes,
}) => (
  <Paper square elevation={1}>
    <Select
      classes={classes}
      options={values}
      components={{
        IndicatorsContainer,
        Control,
        Option,
        NoOptionsMessage: Option,
        Placeholder,
        SingleValue: isCountry ? SingleCountryValue : SingleValue,
        ValueContainer,
        Menu,
      }}
      value={value}
      onChange={handleValue}
      noOptionsMessage={() => <FormattedMessage {...messages[keys.noOptions]} />}
      placeholder={<FormattedMessage {...messages[keys.placeholder]} />}
      countryTypes={countryTypes}
      handleType={handleType}
      countryMessages={{
        COUNTRY: <FormattedMessage {...messages.country} />,
        REGION: <FormattedMessage {...messages.region} />,
      }}
    />
  </Paper>
);

Selector.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.object,
  values: PropTypes.array,
  keys: PropTypes.object,
  handleValue: PropTypes.func,
  isCountry: PropTypes.bool,
  countryTypes: PropTypes.object,
  handleType: PropTypes.func,
};

export default withStyles(styles)(Selector);
