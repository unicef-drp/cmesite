import React from 'react';
import PropTypes from 'prop-types';
import { path, map, isNil } from 'ramda';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import unicefLogo from '../../../assets/unicef-black-logo.png';
import whoLogo from '../../../assets/who-black-logo.png';
import unLogo from '../../../assets/un-black-logo.png';
import wboLogo from '../../../assets/wbo-black-logo.png';

const style = theme => ({
  splash: {
    height: 350,
  },
  wrapper: {
    backgroundColor: theme.palette.secondary.dark,
    paddingLeft: theme.spacing.unit * 12,
    paddingRight: theme.spacing.unit * 12,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
    },
  },
  about: {
    backgroundColor: theme.palette.secondary.main,
    marginTop: theme.spacing.unit * -2,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4,
  },
  typo: {
    color: theme.palette.primary.dark,
  },
  title: {
    color: theme.palette.primary.dark,
    marginBottom: theme.spacing.unit * 4,
  },
  section: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    padding: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 4,
  },
  logos: {
    border: `1px solid ${theme.palette.primary.light}`,
    borderLeft: 0,
    borderRight: 0,
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4,
    paddingLeft: 0,
    paddingRight: 0,
  },
  logo: {
    height: 40,
    margin: theme.spacing.unit,
  },
  focus: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 150,
  },
  focusLogo: {
    width: 100,
  },
  action: {
    padding: theme.spacing.unit * 2,
    paddingTop: 0,
    paddingBottom: 0,
  },
  titleWrapper: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
});

const About = ({ about, focuses, classes }) => (
  <React.Fragment>
    <div
      className={classes.splash}
      style={{
        background: `url("${path(['acf', 'image', 'url'])(
          about,
        )}") no-repeat center`,
      }}
    />
    <Grid container className={classes.wrapper} justify="center">
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        className={classes.about}
        container
        justify="center"
      >
        <Grid item xs={12} sm={7} md={7} className={classes.titleWrapper}>
          <Typography variant="headline" align="center" className={classes.title}>
            {path(['title', 'rendered'])(about)}
          </Typography>
          <Typography variant="body2" align="center" paragraph>
            <span
              dangerouslySetInnerHTML={{
                __html: path(['content', 'rendered'])(about),
              }}
            />
          </Typography>
        </Grid>
        <Grid
          item
          xs={11}
          sm={10}
          md={10}
          className={classNames(classes.section, classes.logos)}
        >
          <img src={unicefLogo} className={classes.logo} />
          <img src={whoLogo} className={classes.logo} />
          <img src={unLogo} className={classes.logo} />
          <img src={wboLogo} className={classes.logo} />
        </Grid>
        <Grid item xs={12} sm={7} md={7} className={classes.titleWrapper}>
          <Typography variant="headline" align="center" className={classes.title}>
            <FormattedMessage {...messages.focus} />
          </Typography>
        </Grid>
        <Grid item xs={11} sm={10} md={10} className={classes.section}>
          {map(focus => {
            const image = path(['acf', 'image'])(focus);
            return (
              <div key={focus.id} className={classes.focus}>
                {isNil(image) ? null : (
                  <img
                    src={image.url}
                    alt={image.alt}
                    className={classes.focusLogo}
                  />
                )}
                <Typography
                  variant="body2"
                  align="center"
                  paragraph
                  className={classes.typo}
                >
                  {path(['title', 'rendered'])(focus)}
                </Typography>
              </div>
            );
          })(focuses)}
        </Grid>
        <Grid
          item
          xs={12}
          sm={10}
          md={10}
          className={classNames(classes.section, classes.action)}
        >
          <Button variant="contained" color="primary">
            <FormattedMessage {...messages.action} />
          </Button>
        </Grid>
      </Grid>
    </Grid>
  </React.Fragment>
);

About.propTypes = {
  about: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  focuses: PropTypes.array,
};

About.defaultProps = {
  focuses: [],
};

export default withStyles(style)(About);
