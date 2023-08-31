import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import OEPAnalytics from "Components/OEPAnalytics";
import { actionTypesFiltersUI } from "./reducer";
import filterStyles from "./scss/filters.module.scss";
import { setByValue } from "./store/actions";

/**
 * Toggle Filters that filter concurrently
 * @param {string} name key to be set in local store
 * @param {string} filterBy this is what is used to do the filtering in the global filters store
 * @param {function} dispatchUI local store dispatch function
 * @param {object} UIState current local UI state
 */
export const ToggleFilter = ({ name, filterBy, dispatchUI, UIState, page }) => {
  const dispatch = useDispatch();
  const [item, setItem] = useState(null);
  const activeFilterList = useSelector(
    (state) => state.filters.activeFilterList
  );
  const toggleFilter = (active) => {
    // Toggle active and filter state on click
    dispatch(
      setByValue({
        key: filterBy,
        value: name,
        active: !active,
      })
    );
  };
  // Pass item to local store to be saved
  useEffect(() => {
    dispatchUI({
      type: actionTypesFiltersUI.SET_ACTIVE_TOGGLE_FILTERS,
      payload: { name, active: false },
    });
  }, [dispatchUI, name]);

  useEffect(() => {
    // Your item is in the store now we can set it to local state.
    if (UIState.toggleFilters[name]) {
      setItem(UIState.toggleFilters[name]);
    }
  }, [UIState.toggleFilters, name]);

  // Tracking active UI state from store
  useEffect(() => {
    // We are actively filter by the filterBy value
    if (activeFilterList[filterBy]) {
      dispatchUI({
        type: actionTypesFiltersUI.SET_ACTIVE_TOGGLE_FILTERS,
        payload: { name, active: true },
      });
    } else {
      // Item is not be filtered by the filterBy value
      dispatchUI({
        type: actionTypesFiltersUI.SET_ACTIVE_TOGGLE_FILTERS,
        payload: { name, active: false },
      });
    }
  }, [activeFilterList, dispatchUI, name, filterBy]);

  if (!item) {
    return null;
  }

  return (
    <OEPAnalytics
      page={page}
      componentType="Button"
      url={`Select ${name}`}
      componentName={`Select ${name} Filter`}
    >
      <button
        onClick={toggleFilter.bind(null, item.active)}
        className={`${filterStyles.filterButton} ${
          item.active ? filterStyles.active : ""
        }`}
      >
        {name}
      </button>
    </OEPAnalytics>
  );
};

export default React.memo(ToggleFilter);
