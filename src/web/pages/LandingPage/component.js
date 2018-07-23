import React from 'react';
import { map } from 'ramda';
import { array } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import messages from './messages';
import Header from '../../components/Header';
import splash from '../../../assets/splash.jpg';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

const splashStyles = theme => ({
  splash: {
    background: `url("${splash}")`,
    height: 400,
  },
  text: {
    color: 'white',
  },
});

const Splash = withStyles(splashStyles)(({ classes }) => (
  <Grid
    container
    justify="space-around"
    alignItems="center"
    className={classes.splash}
  >
    <Grid item xs={4}>
      <Typography variant="display2" className={classes.text}>
        <FormattedMessage {...messages.splashTitle} />
      </Typography>
      <Typography variant="subheading" className={classes.text}>
        <FormattedMessage {...messages.splashDescription} />
      </Typography>
    </Grid>
    <Grid item xs={5} />
  </Grid>
));

const postStyles = () => ({
  card: {
    margin: '20px 0',
  },
  media: {
    height: 0,
    paddingTop: '40%', // 16:9
  },
  header: {
    paddingBottom: 0,
  },
  content: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  actions: {
    paddingTop: 0,
  },
});

const Post = withStyles(postStyles)(({ post, classes }) => (
  <Card className={classes.card}>
    <CardMedia
      className={classes.media}
      image={post._embedded['wp:featuredmedia'][0].source_url}
      title={post._embedded['wp:featuredmedia'][0].alt_text}
    />
    <CardHeader className={classes.header} title={post.title.rendered} />
    <CardContent className={classes.content}>
      <Typography
        component="p"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </CardContent>
    <CardActions className={classes.actions}>
      <Button size="small" color="primary">
        <FormattedMessage {...messages.postReadMore} />
      </Button>
    </CardActions>
  </Card>
));

const getPosts = map(post => <Post key={post.id} post={post} />);

export const LandingPage = ({ posts }) => (
  <div>
    <Header />
    <Splash />
    <Grid container justify="space-around">
      <Grid item xs={3}>
        {getPosts(posts)}
      </Grid>
      <Grid item xs={6}>
        latest trends... (map)
      </Grid>
    </Grid>
  </div>
);

LandingPage.propTypes = {
  posts: array.isRequired,
};

export default LandingPage;
