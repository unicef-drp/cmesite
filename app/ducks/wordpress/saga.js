import { call, put, takeEvery } from 'redux-saga/effects';
import request from 'utils/request';
import { LOAD_POSTS } from './constants';
import { loadPostsSuccess, loadPostsError } from './actions';
import { wordpressEndpoint } from '../../staticConfig';

export function* getPosts({ postType }) {
  const requestURL = `${wordpressEndpoint}/${postType}?fields=id,title,content,modified_gmt,tags,acf&order=desc&orderBy=modified&per_page=100`;

  try {
    const posts = yield call(request, requestURL);
    yield put(loadPostsSuccess(postType, posts));
  } catch (error) {
    yield put(loadPostsError(postType, error));
  }
}

export default function* saga() {
  yield takeEvery(LOAD_POSTS, getPosts);
}
