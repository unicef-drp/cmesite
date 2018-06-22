import React from 'react';
import { map } from 'ramda';
import { array, object } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const Post = ({ post }) => (
  <ul>
    <span dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
  </ul>
);
Post.propTypes = {
  post: object.isRequired,
};

const getPosts = map(post => <Post key={post.id} post={post} />);

export const LandingPage = ({ posts }) => (
  <div>
    <FormattedMessage {...messages.welcome} />
    <li>{getPosts(posts)}</li>
  </div>
);

LandingPage.propTypes = {
  posts: array.isRequired,
};

export default LandingPage;
