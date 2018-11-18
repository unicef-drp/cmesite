import React from 'react';
import PropTypes from 'prop-types';
import { path, isNil } from 'ramda';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Wrapper from '../Wrapper';

const style = theme => ({
  wrapper: {
    backgroundColor: theme.palette.secondary.main,
  },
  root: {
    backgroundColor: theme.palette.secondary.main,
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4,
  },
  typo: {
    color: theme.palette.primary.dark,
  },
  image: {
    width: '100%',
  },
});

const Method = ({ method, classes }) => {
  const image = path(['acf', 'image'])(method);
  return (
    <Wrapper classes={{ root: classes.wrapper }}>
      <div className={classes.root}>
        <Typography variant="headline" align="center" className={classes.typo}>
          {path(['title', 'rendered'])(method)}
        </Typography>
        <Typography variant="body2" align="center" paragraph>
          <span
            dangerouslySetInnerHTML={{
              __html: path(['content', 'rendered'])(method),
            }}
          />
        </Typography>
        {isNil(image) ? null : <img className={classes.image} src={image.url} alt={image.alt} />}
      </div>
    </Wrapper>
  );
};

Method.propTypes = {
  method: PropTypes.object,
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(Method);
