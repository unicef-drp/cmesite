import React from 'react';
import { map } from 'ramda';
import { array, object } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Header from '../../components/Header';

const Post = ({ post }) => (
  <li>
    <span dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
  </li>
);

Post.propTypes = {
  post: object.isRequired,
};

const getPosts = map(post => <Post key={post.id} post={post} />);

export const LandingPage = ({ posts }) => (
  <div>
    <Header />
    <FormattedMessage {...messages.welcome} />
    <ul>{getPosts(posts)}</ul>
  </div>
);

LandingPage.propTypes = {
  posts: array.isRequired,
};

export default LandingPage;
