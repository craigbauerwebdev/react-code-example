import * as actionTypes from "../actions/actionsTypes";

import ConfigService from "services/ConfigService";
import concatenatingFilters from "./utils/concatenatingFilters";
import removeActiveKey from "./utils/removeActiveKey";

const initialState = {
  filteredData: null,
  fullList: null,
  activeFilterList: {}, // Hold active search's
  fuzzySearchResult: null,
  timezone: ConfigService.runValues.momentTimezone,
  searchTerm: "",
  fuzzySearching: false,
  pageType: "",
  breadcrumbLabel: "",
  breadcrumbUrl: "",
};

export const pageTypes = {
  SESSION: "session",
  POSTER: "poster",
  SPEAKER: "speaker",
  EXHIBITOR: "exhibitor",
  EXHIBITOR_NETWORKING: "exhibitorNetworking",
  SCHEDULE: "schedule",
  FAVORITES: "favorites",
  WEBINARS: "webinars",
};

/**
 * Non concatenating filter ie (All)
 * @param {object} state
 * @param {string} payload
 */
const filterContentNonConcatenating = (state, payload) => {
  // Match payload string to preform filter
  switch (payload) {
    case "all":
    case "clear":
      return {
        ...state,
        filteredData: state.fullList,
        activeFilterList: {},
        fuzzySearchResult: null,
        searchTerm: "",
        fuzzySearching: false,
      };
    default:
      return {
        ...state,
      };
  }
};

const updateActiveFilters = (state, { key, value, active }) => {
  let activeFilters;

  // Update active filter(remove the old active filter)
  if (active) {
    activeFilters = { [key]: [value] };
  } else {
    activeFilters = {};
  }

  return {
    ...state,
    activeFilterList: activeFilters ? { ...activeFilters } : {},
  };
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_FILTERED_DATA:
      return {
        ...state,
        filteredData: action.payload,
      };
    case actionTypes.SET_FULL_LIST:
      return {
        ...state,
        fullList: action.payload.data,
        filteredData: action.payload.data,
        pageType: action.payload.page,
      };
    case actionTypes.UPDATE_FULL_LIST:
      return {
        ...state,
        fullList: action.payload,
      };
    case actionTypes.SET_BREADCRUMB_LABEL_AND_URL:
      return {
        ...state,
        breadcrumbLabel: action.payload.breadcrumbLabel,
        breadcrumbUrl: action.payload.breadcrumbUrl,
      };
    case actionTypes.NON_CONCATENATING_FILTER:
      return filterContentNonConcatenating(state, action.payload);
    case actionTypes.REFILTER_DATA:
      return concatenatingFilters(
        {
          ...state,
          fullList: action.payload.data,
          filteredData: action.payload.data,
        },
        {
          key: null,
          value: false,
          active: false,
        }
      );
    case actionTypes.FILTER_DATA_BY_VALUE:
      return concatenatingFilters(state, action.payload);
    case actionTypes.SET_FILTER_DATA_BY_VALUE_TO_ACTIVE:
      return concatenatingFilters(state, { ...action.payload, active: true });
    case actionTypes.ATTENDEE_FILTER_DATA_BY_VALUE:
      return updateActiveFilters(state, action.payload);
    case actionTypes.EMPTY_FILTERED_DATA:
      return {
        ...state,
        ...initialState,
        breadcrumbLabel: state.breadcrumbLabel,
        breadcrumbUrl: state.breadcrumbUrl,
      };
    case actionTypes.SET_FUZZY_SEARCH_RESULTS:
      return concatenatingFilters(
        {
          ...state,
          fuzzySearchResult: action.payload.data,
          filteredData: action.payload.data,
          fuzzySearching: action.payload.isSearching,
          searchTerm: action.payload.term,
        },
        {
          key: null,
          value: false,
          active: false,
        }
      );
    case actionTypes.SET_TIMEZONE_FILTERS:
      return {
        ...state,
        timezone: action.payload,
      };
    case actionTypes.EMPTY_SEARCH:
      return concatenatingFilters(
        {
          ...state,
          searchTerm: "",
          fuzzySearching: false,
        },
        {
          key: null,
          value: false,
          active: false,
        }
      );
    case actionTypes.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
      };
    case actionTypes.IS_SEARCHING:
      return {
        ...state,
        searchTerm: action.payload,
      };
    case actionTypes.SET_ACTIVE_FILTER_LIST:
      return {
        ...state,
        activeFilterList: removeActiveKey(state, action.payload),
      };
    default:
      return state;
  }
};

export default filterReducer;
