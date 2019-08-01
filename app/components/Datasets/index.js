import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import Typography from '@material-ui/core/Typography';
import DescriptionIcon from '@material-ui/icons/Description';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Wrapper from 'components/Wrapper';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import useStyles from './styles';

const Datasets = ({ datasets = [] }) => {
  const classes = useStyles();

  if (R.isEmpty(datasets)) return null;

  return (
    <Wrapper classes={{ root: classes.wrapper }}>
      <div id="datasets" />
      <Typography variant="h5" color="secondary" align="center">
        <FormattedMessage {...messages.title} />
      </Typography>
      <Typography variant="body2" color="secondary" align="center">
        <FormattedMessage {...messages.subtitle} />
      </Typography>
      <Grid container className={classes.list} spacing={2}>
        {R.map(dataset => {
          const file = R.path(['acf', 'file'])(dataset);
          if (R.isNil(file)) return null;
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
                  {`${R.path(['title', 'rendered'])(dataset)} ${dataset.acf.file.description}`}
                </Typography>
              </Button>
            </Grid>
          );
        }, datasets)}
      </Grid>
    </Wrapper>
  );
}

Datasets.propTypes = {
  datasets: PropTypes.array,
};

export default Datasets;
