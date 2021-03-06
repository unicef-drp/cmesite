import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createRootReducer from '../reducers';
import { testMiddleware } from './middlewares';

const configureStore = (initialState, hooks) => {
  const baseMiddlewares = [thunk, testMiddleware(hooks)];
  const middlewares = baseMiddlewares;
  return createStore(
    createRootReducer(),
    initialState,
    applyMiddleware(...middlewares),
  );
};

export default configureStore;
