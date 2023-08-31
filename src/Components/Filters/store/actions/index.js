import * as actionTypes from "./actionsTypes";

export const setFilteredData = (payload) => ({
  type: actionTypes.SET_FILTERED_DATA,
  payload,
});

export const setFullList = (payload) => ({
  type: actionTypes.SET_FULL_LIST,
  payload,
});

export const refilterData = (payload) => ({
  type: actionTypes.REFILTER_DATA,
  payload,
});

export const updateFullList = (payload) => ({
  type: actionTypes.UPDATE_FULL_LIST,
  payload,
});

export const filterDataNonConcatenating = (payload) => ({
  type: actionTypes.NON_CONCATENATING_FILTER,
  payload,
});

export const emptyFilterData = () => ({
  type: actionTypes.EMPTY_FILTERED_DATA,
});

export const setByValue = (payload) => ({
  type: actionTypes.FILTER_DATA_BY_VALUE,
  payload,
});

export const setToActiveByValue = (payload) => ({
  type: actionTypes.SET_FILTER_DATA_BY_VALUE_TO_ACTIVE,
  payload,
});

export const setFuzzySearch = (payload) => ({
  type: actionTypes.SET_FUZZY_SEARCH_RESULTS,
  payload,
});

export const setAttendeeByValue = (payload) => ({
  type: actionTypes.ATTENDEE_FILTER_DATA_BY_VALUE,
  payload,
});

export const setTimezoneFilters = (payload) => ({
  type: actionTypes.SET_TIMEZONE_FILTERS,
  payload,
});

export const emptySearch = () => ({
  type: actionTypes.EMPTY_SEARCH,
});

export const setSearch = (payload) => ({
  type: actionTypes.SET_SEARCH_TERM,
  payload,
});

export const setIsSearching = (payload) => ({
  type: actionTypes.IS_SEARCHING,
  payload,
});

export const setActiveFilterList = (payload) => ({
  type: actionTypes.SET_ACTIVE_FILTER_LIST,
  payload,
});
