import React from 'react';
import PropTypes from 'prop-types';
import { map, isNil, path } from 'ramda';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import withStyles from '@material-ui/core/styles/withStyles';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const style = theme => ({
  wrapper: {
    backgroundColor: theme.palette.secondary.main,
    marginTop: theme.spacing.unit * -6,
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
    height: `calc(100% + ${theme.spacing.unit * 6}px)`,
  },
  container: {
    paddingTop: theme.spacing.unit,
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'space-around',
    },
  },
  card: {
    borderRadius: 0,
    background: 'none',
    padding: 0,
    [theme.breakpoints.down('sm')]: {
      width: 320,
      paddingTop: 0,
      paddingLeft: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
    },
  },
  media: {
    [theme.breakpoints.up('md')]: {
      paddingTop: '56.5%',
      height: 0,
    },
    [theme.breakpoints.down('sm')]: {
      height: 160,
    },
  },
  content: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  typo: {
    color: theme.palette.primary.dark,
  },
});

const News = ({ classes, news }) => (
  <div className={classes.wrapper}>
    <Typography variant="title" align="center" className={classes.typo}>
      <FormattedMessage {...messages.title} />
    </Typography>
    <div className={classes.container}>
      {map(post => {
        const image = path(['acf', 'image'])(post);
        return (
          <Card key={post.id} className={classes.card} elevation={0}>
            {isNil(image) ? null : (
              <CardMedia
                className={classes.media}
                image={post.acf.image.url}
                title={post.acf.image.alt}
              />
            )}
            <CardContent className={classes.content}>
              <Typography variant="body2" color="primary" paragraph>
                {path(['title', 'rendered'])(post)}
              </Typography>
              <Typography variant="body2" paragraph>
                <span
                  dangerouslySetInnerHTML={{
                    __html: path(['content', 'rendered'])(post),
                  }}
                />
              </Typography>
            </CardContent>
          </Card>
        );
      })(news)}
    </div>
  </div>
);

News.propTypes = {
  classes: PropTypes.object.isRequired,
  news: PropTypes.array,
};

News.defaultProps = {
  news: [],
};

export default withStyles(style)(News);
