import { pluck } from 'ramda';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import ducks from './ducks';

const reducers = pluck('reducer')(ducks);
const createRootReducer = () =>
  combineReducers({
    ...reducers,
    routing: routerReducer,
  });
export default createRootReducer;
