export const START_REQUEST = 'CM/CORE/START_REQUEST';
export const END_REQUEST = 'CM/CORE/END_REQUEST';
export const REQUEST_ERROR = 'CM/CORE/REQUEST_ERROR';

const initialState = { pendingRequests: 0 };
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case START_REQUEST:
      return {
        ...state,
        error: undefined,
        pendingRequests: state.pendingRequests + 1,
      };
    case REQUEST_ERROR:
      return {
        ...state,
        error: action.error,
        pendingRequests: state.pendingRequests - 1,
      };
    case END_REQUEST:
      return {
        ...state,
        error: undefined,
        pendingRequests: state.pendingRequests - 1,
      };
    default:
      return state;
  }
};

export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });
export const requestError = ({ method, errorCode, statusCode }) => ({
  type: REQUEST_ERROR,
  error: { method, errorCode, statusCode },
});

const actions = {
  startRequest,
  endRequest,
  requestError,
};

export default { reducer, actions };
