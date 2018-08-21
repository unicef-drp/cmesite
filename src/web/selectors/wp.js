import {
  prop,
  propOr,
  filter,
  contains,
  pipe,
  take,
  indexBy,
  isNil,
  identity,
  ifElse,
  last,
  head,
  equals,
  reject,
} from 'ramda';
import { createSelector } from 'reselect';

// should be in config
const SPLASH_TAGNAME = 'splash';
const NEWS_TAGNAME = 'news';
const REPORT_TAGNAME = 'report';
const DATASET_TAGNAME = 'dataset';
const ABOUT_TAGNAME = 'about';
const FOCUS_TAGNAME = 'focus';
const METHOD_TAGNAME = 'method';
const FEATURED_TAGNAME = 'featured';
const NEWS_LIMIT = 2;

const hasTag = tag => pipe(prop('tags'), contains(prop('id')(tag)));
const getTaggedPosts = (tagName, limit, antiTagName) => (tags, posts) => {
  const tag = prop(tagName)(tags);
  const antiTag = prop(antiTagName)(tags);
  if (isNil(tag)) return isNil(limit) ? [] : null;
  return pipe(
    ifElse(() => isNil(antiTag), identity, reject(hasTag(antiTag))),
    filter(hasTag(tag)),
    ifElse(
      () => isNil(limit),
      identity,
      ifElse(() => equals(1, limit), head, take(limit)),
    ),
  )(posts);
};

export const getWP = prop('wp');
export const getTags = createSelector(
  getWP,
  pipe(propOr([], 'tags'), indexBy(prop('name'))),
);
export const getPosts = createSelector(getWP, propOr([], 'posts'));
export const getNews = createSelector(
  getTags,
  getPosts,
  () => [
    {
      id: 1,
      title: { rendered: 'title' },
      content: { rendered: 'content' },
    },
  ],
  //getTaggedPosts(NEWS_TAGNAME, NEWS_LIMIT),
);
export const getReports = createSelector(
  getTags,
  getPosts,
  getTaggedPosts(REPORT_TAGNAME),
);
export const getFeaturedReports = createSelector(
  getTags,
  getReports,
  getTaggedPosts(FEATURED_TAGNAME),
);
export const getMethodReports = createSelector(
  getTags,
  getReports,
  getTaggedPosts(METHOD_TAGNAME),
);
export const getDatasets = createSelector(
  getTags,
  getPosts,
  getTaggedPosts(DATASET_TAGNAME),
);
export const getDatasetsUpdatedAt = createSelector(
  getDatasets,
  pipe(last, prop('modified_gmt')),
);
export const getSplash = createSelector(
  getTags,
  getPosts,
  getTaggedPosts(SPLASH_TAGNAME, 1),
);
export const getAbout = createSelector(
  getTags,
  getPosts,
  getTaggedPosts(ABOUT_TAGNAME, 1),
);
export const getFocuses = createSelector(
  getTags,
  getPosts,
  getTaggedPosts(FOCUS_TAGNAME),
);
export const getMethod = createSelector(
  getTags,
  getPosts,
  getTaggedPosts(METHOD_TAGNAME, 1, REPORT_TAGNAME),
);
