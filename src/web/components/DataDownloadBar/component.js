import React from 'react';
import PropTypes from 'prop-types';
import { map, xprod, prop } from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { FORMATS, SCOPES } from '../../ducks/data';

const style = theme => ({
  wrapper: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  buttonWrapper: {
    padding: theme.spacing.unit,
    position: 'relative',
  },
  button: {
    textTransform: 'none',
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

const DataDownloadBar = ({ classes, downloadData, downloadingData }) => (
  <div className={classes.wrapper}>
    {map(([format, scope]) => {
      const key = `${format}.${scope}`;
      const downloading = prop(key, downloadingData);
      return (
        <div key={key} className={classes.buttonWrapper}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => downloadData({ format, scope })}
            disabled={downloading}
          >
            <FormattedMessage {...prop(key, messages)} />
          </Button>
          {downloading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
      );
    })(xprod(FORMATS, SCOPES))}
  </div>
);

DataDownloadBar.propTypes = {
  downloadingData: PropTypes.object,
  downloadData: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(DataDownloadBar);
