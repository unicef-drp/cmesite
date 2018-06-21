import { is } from 'ramda';

const isFunction = is(Function);
const isArray = is(Array);

const callFn = (fn, store, action) => {
  if (!isFunction(fn)) return;
  fn(store.getState, action);
};

export const testMiddleware = (hooks = {}) => {
  let stopHooks = false;
  return store => next => action => {
    const result = next(action);
    const fn = !stopHooks && hooks[action.type];
    if (fn) {
      try {
        if (isArray(fn)) {
          fn.called = fn.called || 0;
          callFn(fn[fn.called++], store, action); // eslint-disable-line no-plusplus
        }
        callFn(fn, store, action);
      } catch (e) {
        console.log(e); // eslint-disable-line no-console
        stopHooks = true;
      }
    }
    return result;
  };
};
