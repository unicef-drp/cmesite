import React from 'react';
import PropTypes from 'prop-types';
import { map, propOr, pipe, values, length, min } from 'ramda';
// import { format } from 'date-fns';
import Typography from '@material-ui/core/Typography';
import DescriptionIcon from '@material-ui/icons/Description';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Wrapper from '../Wrapper';
import { DATASET_TYPES } from '../../constants';

const style = theme => ({
  wrapper: {
    backgroundColor: theme.palette.primary.main,
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4,
  },
  list: {
    paddingTop: theme.spacing.unit * 2,
  },
  item: {
    borderRadius: 0,
  },
  typo: {
    paddingLeft: theme.spacing.unit * 2,
    textTransform: 'none',
  },
  type: {
    borderBottom: `1px solid ${theme.palette.primary.light}`,
  },
  icon: {
    color: theme.palette.secondary.main,
  },
});

const Datasets = ({ classes, /*updatedAt,*/ datasets }) => (
  <Wrapper classes={{ root: classes.wrapper }}>
    <div id="datasets" />
    <Typography variant="headline" color="secondary" align="center">
      <FormattedMessage {...messages.title} />
    </Typography>
    <Typography variant="body2" color="secondary" align="center">
      <FormattedMessage {...messages.subtitle} />
    </Typography>
    {/*<Typography variant="body2" color="secondary" align="center">
      <FormattedMessage {...messages.updatedAt} />
      {' - '}
      {format(updatedAt, 'DD MMMM YYYY', { locale: 'en' })}
    </Typography>*/}
    <Grid container className={classes.list} spacing={16}>
      {map(type => (
        <Grid key={type} item xs={12} md={12 / min(3, pipe(values, length)(datasets))}>
          <Typography color="secondary" className={classes.type} variant="subtitle1">
            <FormattedMessage {...messages[type]} />
          </Typography>
          {map(dataset => (
            <Button
              key={dataset.id}
              component="a"
              color="inherit"
              className={classes.item}
              target="_blank"
              href={dataset.acf.file.url}
              download
            >
              <DescriptionIcon className={classes.icon} />
              <Typography color="secondary" className={classes.typo} variant="body2">
                {`${dataset.title.rendered} ${dataset.acf.file.description}`}
              </Typography>
            </Button>
          ))(propOr([], type, datasets))}
        </Grid>
      ))(DATASET_TYPES)}
    </Grid>
  </Wrapper>
);

Datasets.propTypes = {
  classes: PropTypes.object.isRequired,
  //updatedAt: PropTypes.string,
  datasets: PropTypes.object,
};

Datasets.defaultProps = {
  datasets: {},
};

export default withStyles(style)(Datasets);
