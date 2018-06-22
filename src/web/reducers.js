import { pluck } from 'ramda';
import { combineReducers } from 'redux';
import ducks from './ducks';

const reducers = pluck('reducer')(ducks);
const createRootReducer = () =>
  combineReducers({
    ...reducers,
  });
export default createRootReducer;
