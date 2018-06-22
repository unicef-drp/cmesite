import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createRootReducer from '../reducers';

const configureStore = initialState => {
  const middlewares = [thunk];
  return createStore(
    createRootReducer(),
    initialState,
    applyMiddleware(...middlewares),
  );
};

export default configureStore;
