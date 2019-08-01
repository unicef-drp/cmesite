import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Wrapper from 'components/Wrapper';
import useStyles from './styles';

const Method = ({ title = {}, content = {}, acf = {} }) => {
  const classes = useStyles();

  return (
    <Wrapper classes={{ root: classes.wrapper }}>
      <div className={classes.root}>
        <Typography variant="h5" align="center" className={classes.typo}>
          {title.rendered}
        </Typography>
        <Typography variant="body2" align="center" paragraph>
          <span dangerouslySetInnerHTML={{ __html: content.rendered }} />
        </Typography>
        {acf.image && <img className={classes.image} src={acf.image.url} alt={acf.image.alt} />}
      </div>
    </Wrapper>
  );
};

Method.propTypes = {
  title: PropTypes.object,
  content: PropTypes.object,
  acf: PropTypes.object,
};

export default Method;
