import React from 'react';
import PropTypes from 'prop-types';
import { map, equals } from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const styles = theme => ({
  header: {
    //backgroundColor: theme.palette.secondary.dark,
    paddingBottom: 0,
  },
  typo: {
    color: theme.palette.primary.dark,
  },
  model: {
    textTransform: 'initial',
    color: theme.palette.primary.main,
  },
  btn: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

const DataHeader = ({ classes, title, model, mode, changeMode, isCompare }) => (
  <CardHeader
    className={classes.header}
    title={
      <React.Fragment>
        <Typography align="center" variant="title" className={classes.typo}>
          {title}
        </Typography>
        {!isCompare && (
          <React.Fragment>
            <Grid container justify="center">
              <Grid item>
                {map(m => (
                  <Button
                    className={classes.btn}
                    key={m}
                    size="small"
                    onClick={() => changeMode(m)}
                    disabled={equals(m, mode)}
                    color="primary"
                  >
                    <FormattedMessage {...messages[m]} />
                  </Button>
                ))(['chart', 'estimates', 'datasources'])}
              </Grid>
            </Grid>
            {model && (
              <Grid container justify="center">
                <Grid item>
                  <Typography variant="subtitle2" className={classes.model}>
                    <FormattedMessage {...messages.model} />
                    {model}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    }
  />
);

DataHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  mode: PropTypes.string,
  model: PropTypes.string,
  changeMode: PropTypes.func,
  isCompare: PropTypes.bool,
};

export default withStyles(styles)(DataHeader);
