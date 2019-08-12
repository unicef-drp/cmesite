import { call, put, take, fork, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { LOAD_STRUCTURE } from './constants';
import { loadStructureSuccess, loadStructureError } from './actions';
import { sdmxEndpoint } from 'staticConfig';

export function* getStructure({ dataflow }) {
  const requestURL = `${sdmxEndpoint}/dataflow/${dataflow.agencyId}/${dataflow.id}/${dataflow.version}/?references=all`;
  const options = {
    headers: {
      'Accept': 'application/vnd.sdmx.structure+json;version=1.0',
      'Accept-Language': 'en',
    },
  };

  try {
    const structure = yield call(request, requestURL, options);
    yield put(loadStructureSuccess(structure));
  } catch (error) {
    yield put(loadStructureError(error));
  }
}

export default function* saga() {
  //const action = yield take(LOAD_STRUCTURE);
  //yield fork(getStructure, action);
  yield takeLatest(LOAD_STRUCTURE, getStructure);
}
