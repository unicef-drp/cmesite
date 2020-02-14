import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { path, isNil, head, map, equals, pathEq, find } from 'ramda';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
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
  container: {
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4,
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  btnType: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

const Method = ({ methods, classes }) => {
  const types = ['childmortality', 'stillbirth'];
  const [type, setType] = useState(head(types));

  const method = find(pathEq(['acf', 'type'], type), methods);
  const image = path(['acf', 'image'])(method);

  return (
    <Wrapper classes={{ root: classes.wrapper }}>
      <div className={classes.root}>
        <Typography variant="headline" align="center" className={classes.typo}>
          <FormattedMessage {...messages.title} />
        </Typography>
        <div className={classes.container} style={{ paddingBottom: 0 }}>
          {map(
            t => (
              <Button
                className={classes.btnType}
                key={t}
                variant="contained"
                onClick={() => setType(t)}
                color={equals(t, type || 'all') ? 'primary' : 'default'}
              >
                <FormattedMessage {...messages[t]} />
              </Button>
            ),
            types,
          )}
        </div>
        <Typography variant="body2" align="center" paragraph>
          <span dangerouslySetInnerHTML={{ __html: path(['content', 'rendered'])(method) }} />
        </Typography>
        {isNil(image) ? null : <img className={classes.image} src={image.url} alt={image.alt} />}
      </div>
    </Wrapper>
  );
};

Method.propTypes = {
  methods: PropTypes.array,
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(Method);
