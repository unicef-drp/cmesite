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
import Wrapper from '../Wrapper';
import unicefLogo from '../../../assets/unicef-black-logo.png';
import whoLogo from '../../../assets/who-black-logo.png';
import unLogo from '../../../assets/un-black-logo.png';
import wboLogo from '../../../assets/wbo-black-logo.png';

const style = theme => ({
  wrapper: {
    backgroundColor: theme.palette.secondary.dark,
  },
  splash: {
    height: 350,
  },
  about: {
    backgroundColor: theme.palette.secondary.main,
    marginTop: theme.spacing.unit * -2,
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
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit * 2,
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
    height: 60,
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

const About = ({ about, focuses, classes, theme }) => (
  <React.Fragment>
    <div
      className={classes.splash}
      style={{
        background: `${theme.palette.primary.main} url("${path(['acf', 'image', 'url'])(
          about,
        )}") repeat center`,
        backgroundSize: 'cover',
      }}
    />
    <Wrapper classes={{ root: classes.wrapper }}>
      <Grid container className={classes.about} justify="center">
        {/* title */}
        <Grid item xs={12} sm={7} md={7} className={classes.titleWrapper}>
          <Typography variant="headline" align="center" className={classes.title}>
            {path(['title', 'rendered'])(about)}
          </Typography>
          <Typography variant="body2" align="center" paragraph className={classes.typo}>
            <span
              dangerouslySetInnerHTML={{
                __html: path(['content', 'rendered'])(about),
              }}
            />
          </Typography>
        </Grid>

        {/* logos */}
        <Grid item xs={11} sm={10} md={10} className={classNames(classes.section, classes.logos)}>
          <img src={unicefLogo} className={classes.logo} />
          <img src={whoLogo} className={classes.logo} />
          <img src={unLogo} className={classes.logo} style={{ height: 70 }} />
          <img src={wboLogo} className={classes.logo} />
        </Grid>

        {/* title */}
        <Grid item xs={12} sm={7} md={7} className={classes.titleWrapper}>
          <Typography variant="headline" align="center" className={classes.title}>
            <FormattedMessage {...messages.focus} />
          </Typography>
        </Grid>

        {/* focuses */}
        <Grid item xs={11} sm={10} md={10} className={classes.section}>
          {map(focus => {
            const image = path(['acf', 'image'])(focus);
            return (
              <div key={focus.id} className={classes.focus}>
                {isNil(image) ? null : (
                  <img src={image.url} alt={image.alt} className={classes.focusLogo} />
                )}
                <Typography
                  variant="body2"
                  align="center"
                  className={classes.typo}
                  style={{ lineHeight: 1.2 }}
                >
                  {path(['title', 'rendered'])(focus)}
                </Typography>
              </div>
            );
          })(focuses)}
        </Grid>

        {/* contact */}
        <Grid item xs={12} sm={10} md={10} className={classNames(classes.section, classes.action)}>
          <Button variant="contained" color="primary">
            <FormattedMessage {...messages.action} />
          </Button>
        </Grid>
      </Grid>
    </Wrapper>
  </React.Fragment>
);

About.propTypes = {
  about: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  focuses: PropTypes.array,
};

About.defaultProps = {
  focuses: [],
};

export default withStyles(style, { withTheme: true })(About);
