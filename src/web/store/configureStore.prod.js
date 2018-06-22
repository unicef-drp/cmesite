import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import createRootReducer from '../reducers';

const configureStore = initialState => {
  const middlewares = [thunk];
  return createStore(
    createRootReducer(),
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );
};

export default configureStore;
