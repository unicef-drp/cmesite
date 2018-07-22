import React from 'react';
import { map } from 'ramda';
import { array, object } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import messages from './messages';
import Header from '../../components/Header';
import splash from '../../../assets/splash.jpg';

const OuterSplash = styled('div')`
  background: url("${splash}");
  background-size: cover;
  height: 300px;
  display: flex;
  align-items: center;
  padding: 0 40px;
`;

const InnerSplash = styled('div')`
  width: 30%;
`;

const style = {
  color: 'white',
};

const Splash = () => {
  return (
    <OuterSplash>
      <InnerSplash>
        <Typography variant="display2" style={style}>
          <FormattedMessage {...messages.splashTitle} />
        </Typography>
        <Typography variant="subheading" style={style}>
          <FormattedMessage {...messages.splashDescription} />
        </Typography>
      </InnerSplash>
    </OuterSplash>
  );
};

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
    <Splash />
    <ul>{getPosts(posts)}</ul>
  </div>
);

LandingPage.propTypes = {
  posts: array.isRequired,
};

export default LandingPage;
