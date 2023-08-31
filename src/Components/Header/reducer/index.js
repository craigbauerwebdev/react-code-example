import formatNavData from "util/formatNavData";

export const actionTypesHeader = {
  NAV_TABS_OPEN: "NAV TABS Open",
  NAV_TABS_CLOSE: "NAV TABS close",
  NAV_DATA: "NAV_DATA",
};

const openTabs = (state, payload) => {
  const newState = {};
  const setToFalse = Object.keys(state.tabs).filter((key) => key !== payload);
  const setToTrue = Object.keys(state.tabs).find((key) => key === payload);

  setToFalse.map((key) => (newState[key] = false));
  newState[setToTrue] = !state.tabs[setToTrue];

  return { ...state, tabs: { ...newState } };
};

const closeTabs = (state, payload) => {
  const newState = {};
  const currentMenu = Object.keys(state.tabs).find((key) => key === payload);
  const getState = state.tabs[currentMenu];

  if (getState) {
    newState[currentMenu] = !state.tabs[currentMenu];
  }

  return { ...state, tabs: { ...state.tabs, ...newState } };
};

export const navTabsReducer = (state, action) => {
  switch (action.type) {
    case actionTypesHeader.NAV_TABS_OPEN:
      return openTabs(state, action.payload);
    case actionTypesHeader.NAV_TABS_CLOSE:
      return closeTabs(state, action.payload);
    case actionTypesHeader.NAV_DATA:
      return {
        ...state,
        navData: formatNavData(action.payload.nav),
        logo: action.payload.logo,
      };
    default:
      return state;
  }
};
