import React from 'react';
import PropTypes from 'prop-types';
import { map, path, isNil } from 'ramda';
import { format } from 'date-fns';
import Typography from '@material-ui/core/Typography';
import DescriptionIcon from '@material-ui/icons/Description';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Wrapper from '../Wrapper';

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
  icon: {
    color: theme.palette.secondary.main,
  },
});

const Datasets = ({ classes, updatedAt, datasets }) => (
  <Wrapper classes={{ root: classes.wrapper }}>
    <Typography variant="headline" color="secondary" align="center">
      <FormattedMessage {...messages.title} />
    </Typography>
    <Typography variant="body2" color="secondary" align="center">
      <FormattedMessage {...messages.updatedAt} />
      {' - '}
      {format(updatedAt, 'DD MMMM YYYY', { locale: 'en' })}
    </Typography>
    <Grid container className={classes.list} spacing={16}>
      {map(dataset => {
        const file = path(['acf', 'file'])(dataset);
        if (isNil(file)) return null;
        return (
          <Grid item xs={12} md={6} lg={4} key={dataset.id}>
            <Button
              component="a"
              color="inherit"
              className={classes.item}
              target="_blank"
              href={dataset.acf.file.url}
              download
            >
              <DescriptionIcon className={classes.icon} />
              <Typography color="secondary" className={classes.typo} variant="body2">
                {`${path(['title', 'rendered'])(dataset)}: ${dataset.acf.file.description}`}
              </Typography>
            </Button>
          </Grid>
        );
      }, datasets)}
    </Grid>
  </Wrapper>
);

Datasets.propTypes = {
  classes: PropTypes.object.isRequired,
  updatedAt: PropTypes.string,
  datasets: PropTypes.array,
};

Datasets.defaultProps = {
  datasets: [],
};

export default withStyles(style)(Datasets);
