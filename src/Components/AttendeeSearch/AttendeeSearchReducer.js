import combinedResults from "./util/combinedResults";
import formatSearchResults from "./util/formatSearchResults";

export const searchActionTypes = {
  SET_QUERY: "SET_QUERY",
  SET_PAGE: "SET_PAGE",
  SET_FILTER: "SET_FILTER",
  SET_INDEX: "SET_INDEX",
  SET_RESULTS: "SET_RESULTS",
  SET_SEARCH_QUERY: "SET_SEARCH_QUERY",
  ADD_RESULTS_OVERRIDE_ITEM: "ADD_RESULTS_OVERRIDE_ITEM",
  CLEAR_SEARCH: "CLEAR_SEARCH",
};

export const initialSearchState = {
  query: "",
  page: 0,
  filter: null,
  index: null,
  resultsInfo: null,
  hits: [],
  searchQuery: "",
  resultsOverrides: [],
  filterbyType: "All",
  filterbyStatus: "All",
};

export const addOverride = (profile, dispatch) => {
  dispatch({
    type: searchActionTypes.ADD_RESULTS_OVERRIDE_ITEM,
    payload: profile,
  });
};

const setFilterData = (state, payload) => {
  if (typeof payload === "string") {
    return {
      ...state,
      filter: payload,
      page: 0,
    };
  }

  if (typeof payload === "object") {
    return {
      ...state,
      filter: payload.filter,
      filterbyType: payload.filterbyType || state.filterbyType,
      filterbyStatus: payload.filterbyStatus || state.filterbyStatus,
      page: 0,
    };
  }

  return {
    ...state,
  };
};

export const searchReducer = (state, action) => {
  switch (action.type) {
    case searchActionTypes.SET_QUERY:
      return {
        ...state,
        query: action.payload,
      };
    case searchActionTypes.SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case searchActionTypes.SET_FILTER:
      return setFilterData(state, action.payload);
    case searchActionTypes.SET_INDEX:
      return {
        ...state,
        index: action.payload,
      };
    case searchActionTypes.SET_RESULTS: {
      return formatSearchResults(state, action.payload);
    }
    case searchActionTypes.SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload,
        page: 0,
      };
    case searchActionTypes.ADD_RESULTS_OVERRIDE_ITEM: {
      return combinedResults(state, action.payload);
    }
    case searchActionTypes.CLEAR_SEARCH:
      return {
        ...state,
        searchQuery: "",
        query: "",
      };
    default:
      return state;
  }
};
