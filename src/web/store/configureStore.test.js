import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createRootReducer from '../reducers';
import { createMiddleware } from '../fsm/machine';
import { testMiddleware } from './middlewares';

const configureStore = (initialState, hooks, machine) => {
  const baseMiddlewares = [thunk, testMiddleware(hooks)];
  const middlewares = machine
    ? [createMiddleware(machine), ...baseMiddlewares]
    : baseMiddlewares;
  return createStore(
    createRootReducer(machine),
    initialState,
    applyMiddleware(...middlewares),
  );
};

export default configureStore;
