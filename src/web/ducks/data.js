export const CHANGE_ACTIVE_TAB = 'CM/DATA/CHANGE_ACTIVE_TAB';

const reducer = (state = { activeTab: 0 }, action = {}) => {
  switch (action.type) {
    case CHANGE_ACTIVE_TAB:
      return { ...state, activeTab: action.activeTab };
    default:
      return state;
  }
};

export const changeActiveTab = activeTab => ({
  type: CHANGE_ACTIVE_TAB,
  activeTab,
});

const actions = { changeActiveTab };

export default { reducer, actions };
