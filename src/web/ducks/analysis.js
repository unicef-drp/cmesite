import * as R from 'ramda';

export const CHANGE_ACTIVE_TAB = 'CM/ANALYSIS/CHANGE_ACTIVE_TAB';

const initialState = {
  activeTab: 0,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_ACTIVE_TAB:
      return R.set(R.lensProp('activeTab'), R.prop('activeTab', action), state);
    default:
      return state;
  }
};

export const changeActiveTab = activeTab => ({ type: CHANGE_ACTIVE_TAB, activeTab });

export default { reducer };
