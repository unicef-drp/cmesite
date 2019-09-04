import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { HashLink as Link } from 'react-router-hash-link';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import routes, { getPath } from '../../routes';
import DataDownloadActions from '../DataDownloadActions';
import { DataAllDimensions } from '../DataDimensions';
import Wrapper from '../Wrapper';
import DataNote from '../DataNote';
import { DOWNLOAD } from '../../api/sdmx';

const style = theme => ({
  wrapper: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  noteBar: {
    backgroundColor: theme.palette.secondary.dark,
  },
});

const DataTabDownload = ({ classes }) => (
  <React.Fragment>
    <Wrapper classes={{ root: classes.wrapper }}>
      <Grid container spacing={16}>
        <Grid item xs={12} container justify="center">
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`${getPath(routes.home)}#datasets`}
          >
            <FormattedMessage {...messages.action} />
          </Button>
        </Grid>
        <Grid item xs={12}>
          <DataAllDimensions isRowDisplay />
          <DataDownloadActions dataType={DOWNLOAD} />
        </Grid>
      </Grid>
    </Wrapper>
    <div className={classes.noteBar}>
      <Wrapper>
        <DataNote dataType={DOWNLOAD} />
      </Wrapper>
    </div>
  </React.Fragment>
);

DataTabDownload.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(DataTabDownload);
