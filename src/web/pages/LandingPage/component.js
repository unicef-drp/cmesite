import React from 'react';
import { map, times } from 'ramda';
import { array } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Typography from '@material-ui/core/Typography';
import messages from './messages';
import Header from '../../components/Header';
import Splash from '../../components/Splash';
import Datasets from '../../components/Datasets';
import Reports from '../../components/Reports';
import Footer from '../../components/Footer';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

/*
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
*/
//const getPosts = map(post => <Post key={post.id} post={post} />);

export const LandingPage = ({ posts }) => (
  <div>
    <Header />
    <Splash
      title={<FormattedMessage {...messages.title} />}
      description={<FormattedMessage {...messages.description} />}
      image={require('../../../assets/splash.jpg')}
    />
    {/*
    <Grid container justify="center">
      <Grid item md={3} sm={4} xs={10}>
        {getPosts(posts)}
      </Grid>
      <Grid item md={7} sm={6} xs={10}>
        latest trends... (map)
      </Grid>
    </Grid>
  */}
    <Datasets
      title="Global Datasets"
      updatedAt="today or yesterday"
      datasets={times(
        n => ({
          id: n,
          name:
            n === 4
              ? 'Estimates of under-five, infant and neonatal mortality Estimates of under-five, infant and neonatal mortality'
              : 'Estimates of under-five, infant and neonatal mortality',
          description:
            n === 4
              ? 'Estimates of under-five, infant and neonatal mortality'
              : 'Estimates',
        }),
        10,
      )}
    />
    <Reports
      title="Reports and papers"
      reports={times(
        n => ({
          id: n,
          name: 'Levels & Trends in Child Mortality Report 2017',
          thumbnail: {
            id: n,
            altText: 'Levels & Trends in Child Mortality Report 2017',
            sourceUrl:
              'https://image.slidesharecdn.com/unicefannualreport2013web2june2014-2-140603103534-phpapp01/95/unicef-annual-report-2013-1-638.jpg?cb=1401791818',
          },
        }),
        3,
      )}
    />
    <Footer />
  </div>
);

LandingPage.propTypes = {
  posts: array.isRequired,
};

export default LandingPage;
