import React, { useEffect, useState } from "react";

import OEPAnalytics from "Components/OEPAnalytics";
import { actionTypesFiltersUI } from "./reducer";
import { filterDataNonConcatenating } from "./store/actions";
import filterStyles from "./scss/filters.module.scss";
import { useDispatch } from "react-redux";

/**
 * Tab Filters that filter concurrently
 * @param {string} name key to be set in local store
 * @param {string} filterBy this is what is used to do the filtering in the global filters store
 * @param {function} dispatchUI local store dispatch function
 * @param {object} UIState current local UI state
 * @param {boolean} defaultActive should this item be active on component load
 */
const TabFiltersNonConcat = ({
  name,
  filterBy,
  dispatchUI,
  UIState,
  defaultActive,
  page,
}) => {
  const dispatch = useDispatch();
  const [item, setItem] = useState(null);
  const filterData = (active) => {
    // Only filter if item clicked in not already active.
    if (!active) {
      dispatch(filterDataNonConcatenating(filterBy));
      dispatchUI({
        type: actionTypesFiltersUI.SET_TAB_FILTERS,
        payload: {
          name,
          active,
        },
      });
    }
  };
  // Pass item to local store to be saved
  useEffect(() => {
    dispatchUI({
      type: actionTypesFiltersUI.SET_TAB_FILTERS,
      payload: {
        name,
        active: defaultActive,
      },
    });
  }, [dispatchUI, name, defaultActive]);

  useEffect(() => {
    if (UIState.tabFilters[name]) {
      // Your item is in the store now we can set it to local state.
      setItem(UIState.tabFilters[name]);
    }
  }, [UIState.tabFilters, name]);

  if (!item) {
    return null;
  }

  return (
    <OEPAnalytics
      page={page}
      componentType="Button"
      url={name}
      componentName={`Select ${name} Filter`}
    >
      <button
        className={`${filterStyles.filterButton} ${
          item.active ? filterStyles.active : ""
        }`}
        onClick={filterData.bind(null, item.active)}
      >
        {name}
      </button>
    </OEPAnalytics>
  );
};

export default TabFiltersNonConcat;
