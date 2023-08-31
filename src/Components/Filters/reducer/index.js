import { setActiveDayFilter, updateDays } from "./utils/daysUI";
import {
  setFiltersWithSubFilters,
  toggleSubFiltersActive,
} from "./utils/subFilterParentItemUI";

import ConfigService from "services/ConfigService";
import formatTabFilters from "./utils/formatTabFilters";
import formatToggleFilters from "./utils/formatToggleFilters";
import resetUI from "./utils/resetUI";

export const actionTypesFiltersUI = {
  SET_FILTERS_DAYS_LIST: "SET_FILTERS_DAYS_LIST",
  SET_ACTIVE_DAY_ITEM: "SET_ACTIVE_DAY_ITEM",
  UPDATE_DAYS_LIST: "UPDATE_DAYS_LIST",
  SET_PARENT_SUB_FILTER: "SET_PARENT_SUB_FILTER",
  TOGGLE_SUB_FILTERS: "TOGGLE_SUB_FILTERS",
  SET_FILTERS_TIMEZONE: "SET_FILTERS_TIMEZONE",
  CLEAR_FILTERS_UI: "CLEAR_FILTERS_UI",
  SET_ACTIVE_TOGGLE_FILTERS: "SET_ACTIVE_TOGGLE_FILTERS",
  SET_TAB_FILTERS: "SET_TAB_FILTERS",
};

export const filterStateUI = {
  daysList: null,
  filtersWithSubFilters: {},
  timezone: ConfigService.runValues.momentTimezone,
  toggleFilters: {},
  tabFilters: {},
};

export const filtersReducer = (state, action) => {
  switch (action.type) {
    case actionTypesFiltersUI.SET_FILTERS_DAYS_LIST:
      return {
        ...state,
        daysList: action.payload,
      };
    case actionTypesFiltersUI.SET_ACTIVE_DAY_ITEM:
      return setActiveDayFilter(state, action.payload);
    case actionTypesFiltersUI.UPDATE_DAYS_LIST:
      return updateDays(state, action.payload);
    case actionTypesFiltersUI.SET_PARENT_SUB_FILTER:
      return setFiltersWithSubFilters(state, action.payload);
    case actionTypesFiltersUI.TOGGLE_SUB_FILTERS:
      return toggleSubFiltersActive(state, action.payload);
    case actionTypesFiltersUI.SET_FILTERS_TIMEZONE:
      return {
        ...state,
        timezone: action.payload,
      };
    case actionTypesFiltersUI.SET_ACTIVE_TOGGLE_FILTERS:
      return formatToggleFilters(state, action.payload);
    case actionTypesFiltersUI.CLEAR_FILTERS_UI:
      return resetUI(state, action.payload);
    case actionTypesFiltersUI.SET_TAB_FILTERS:
      return formatTabFilters(state, action.payload);
    default:
      return {
        ...state,
      };
  }
};
