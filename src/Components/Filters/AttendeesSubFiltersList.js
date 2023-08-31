import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import OEPAnalytics from "Components/OEPAnalytics";
import ReactDOM from "react-dom";
import filterStyles from "./scss/filters.module.scss";
import { searchActionTypes } from "Components/AttendeeSearch/AttendeeSearchReducer";
import { setAttendeeByValue } from "./store/actions";

/**
 * List of sub filters
 * @param {array} filters list of sub filters
 * @param {boolean} active
 * @param {string} page tracking value
 */
const AttendeesSubFiltersList = ({
  filters,
  active,
  page,
  dispatchSearchState,
  searchState,
}) => {
  const dispatch = useDispatch();
  const activeFilterList = useSelector(
    (state) => state.filters.activeFilterList
  );
  const [elementRender, setElementRender] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [filtersList, setFiltersList] = useState(null);

  const toggleFilter = ({ value, key, active }) => {
    // set active/inactive filter button
    dispatch(
      setAttendeeByValue({
        key,
        value,
        active: !active,
      })
    );

    if (!active) {
      // set filter data for algolia Search
      const filter = `attributes.${key}:"${value}"`;
      const payload =
        searchState.filterby !== "All" && searchState.filterby !== "Select All"
          ? {
              filter,
              filterby: "Select All",
            }
          : filter;
      dispatchSearchState({
        type: searchActionTypes.SET_FILTER,
        payload: payload,
      });
    } else {
      // set all data filter if user deactive the selection
      dispatchSearchState({
        type: searchActionTypes.SET_FILTER,
        payload:
          "networking.isVIP.BOOL = 0 AND networking.allowNetworking.BOOL = 1",
      });
    }
  };

  useEffect(() => {
    // Open Sub filters
    if (active) {
      /**
       * This will make a div at the bottom of this ID.
       * This ID is found on the FilterWrapper component.
       */
      const filters = document.querySelector("#filters");
      const el = document.createElement("div");

      el.setAttribute("id", "subFilters");
      filters.appendChild(el);

      setElementRender(el);

      // Give a pause so the display doesn't jump up and down on change sub filters
      setTimeout(() => {
        setShowFilter(true);
      }, 50);
    }

    return () => {
      // On close remove div from DOM
      const el = document.querySelector("#subFilters");
      if (el) {
        el.parentNode.removeChild(el);
      }
    };
  }, [active]);

  useEffect(() => {
    if (filters && filters.length > 0) {
      // Get active filter key for sub filters
      const value = filters[0].key;
      // Get active list of sub filters from global store
      if (activeFilterList[value]) {
        // Set active state for sub filters on mount
        // if there is any, make a algolia search call
        const filtersList = filters.map((filter) => {
          if (
            activeFilterList[value].includes(filter.name) ||
            activeFilterList[value].includes(filter.value)
          ) {
            filter.active = true;
            // set filter data for algolia Search
            const filterField = `attributes.${filter.key}:"${
              filter.name || filter.value
            }"`;
            dispatchSearchState({
              type: searchActionTypes.SET_FILTER,
              payload: filterField,
            });
          } else {
            filter.active = false;
          }

          return filter;
        });

        setFiltersList(filtersList);
      } else {
        const inActiveList = filters.map((filter) => {
          filter.active = false;
          return filter;
        });

        setFiltersList(inActiveList);
      }
    }
  }, [filters, activeFilterList, dispatchSearchState]);

  if (!elementRender) {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      className={`${filterStyles.filterSubFilterHolder} ${
        showFilter && filterStyles.active
      }`}
    >
      <div>
        {filtersList?.map((filter) => (
          <OEPAnalytics
            page={page}
            componentType="Button"
            key={filter.name}
            url={`Select ${filter.name}`}
            componentName={filter.name}
          >
            <button
              aria-label={filter.ariaLabel}
              className={filter.active ? filterStyles.active : ""}
              onClick={toggleFilter.bind(this, {
                value: filter.value || filter.name,
                key: filter.key,
                active: filter.active,
              })}
            >
              {filter.name}
            </button>
          </OEPAnalytics>
        ))}
      </div>
    </div>,
    elementRender
  );
};

function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
  // Only re-render component if events change.
  if (prevProps.active === nextProps.active) {
    return true;
  }

  return false;
}

export default React.memo(AttendeesSubFiltersList, areEqual);
