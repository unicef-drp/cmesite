import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import createRootReducer from '../reducers';

const configureStore = (initialState = {}) => {
  const logger = createLogger({
    duration: true,
    timestamp: false,
    collapsed: true,
    diff: true,
  });
  const middlewares = [thunk, logger];
  return createStore(
    createRootReducer(),
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );
};

export default configureStore;
