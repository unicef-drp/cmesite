import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import useStyles from './styles';

const News = ({ news = [] }) => {
  const classes = useStyles();

  if (R.isEmpty(news)) return null;

  return (
    <div className={classes.wrapper}>
      <Typography variant="h6" align="center" className={classes.typo}>
        <FormattedMessage {...messages.title} />
      </Typography>
      <div className={classes.container}>
        {R.map(post => {
          const image = R.path(['acf', 'image'])(post);
          return (
            <Card key={post.id} className={classes.card} elevation={0}>
              {R.isNil(image) ? null : (
                <CardMedia
                  className={classes.media}
                  image={post.acf.image.url}
                  title={post.acf.image.alt}
                />
              )}
              <CardContent className={classes.content}>
                <Typography variant="body2" color="primary" paragraph>
                  {R.path(['title', 'rendered'])(post)}
                </Typography>
                <Typography variant="body2" paragraph>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: R.path(['content', 'rendered'])(post),
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
}

News.propTypes = {
  news: PropTypes.array,
};

export default News;
