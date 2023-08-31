import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import OEPAnalytics from "Components/OEPAnalytics";
import SubFiltersDaysList from "./SubFiltersDaysList";
import { actionTypesFiltersUI } from "./reducer";
import filterStyles from "./scss/filters.module.scss";
import formatDate from "util/formatDate";
import { getDays } from "Components/Session/utils/filterData";
import { setByValue } from "./store/actions";

/**
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Days-with-Sub-Filters
 * Parent filter item that opens the sub filter
 * @param {string} name this is the key that will be used to save the filter in the store
 * @param {array} subFilters list of sub filter items
 * @param {string} page tracking value
 * @param {function} dispatchUI local store dispatch function
 * @param {object} UIState current local UI state
 * @param {boolean} filterByToday pre filter page with today events
 */
const FiltersWithSubFilters = ({
  name = "Day",
  page,
  dispatchUI,
  UIState,
  filterByToday,
}) => {
  const dispatch = useDispatch();
  const fullList = useSelector((state) => state.filters.fullList);
  const [filterItem, setFilterItem] = useState(null);
  const [hasMounted, setHasMounted] = useState(false);
  const toggleSubFilters = () => {
    dispatchUI({
      type: actionTypesFiltersUI.TOGGLE_SUB_FILTERS,
      payload: name,
    });
  };

  /**
   * Set local store to have a object of all items that have sub-filters.
   * This is so we can display one set of sub filter items at a time.
   * Also to control the active state of the sub filter parent.
   */
  useEffect(() => {
    dispatchUI({
      type: actionTypesFiltersUI.SET_PARENT_SUB_FILTER,
      payload: {
        name,
        active: false,
      },
    });
  }, [dispatchUI, name]);

  /**
   *  Once Item is save in the store we pull out.
   * That item and set it to local state to control the open and close of the sub filters
   */
  useEffect(() => {
    if (UIState.filtersWithSubFilters && UIState.filtersWithSubFilters[name]) {
      setFilterItem(UIState.filtersWithSubFilters[name]);
    }
  }, [UIState.filtersWithSubFilters, name]);

  /**
   * Track component mount to only run once.
   * Filter by today if filterByToday is true
   * Don't re-run on timezone change
   */
  useEffect(() => {
    if (filterByToday && UIState.timezone && !hasMounted) {
      const today = formatDate({ data: new Date() }, UIState.timezone);
      const days = getDays(fullList, UIState.timezone);
      const value =
        days.filter((day) => day.date === today).length > 0 ? today : "All";

      dispatch(
        setByValue({
          active: true,
          value,
          key: "Day",
        })
      );

      setHasMounted(true);
    }
  }, [filterByToday, fullList, UIState.timezone, dispatch, hasMounted]);

  if (!filterItem) {
    return null;
  }

  return (
    <Fragment>
      <OEPAnalytics
        page={page}
        componentType="Button"
        url={`Select ${name}`}
        componentName={`Select ${name}`}
      >
        <button
          onClick={toggleSubFilters}
          className={`${filterStyles.filterButton} ${
            filterItem.active ? filterStyles.active : ""
          }`}
        >
          Days
        </button>
      </OEPAnalytics>
      {filterItem.active && (
        <SubFiltersDaysList UIState={UIState} active={true} page={page} />
      )}
    </Fragment>
  );
};

export default React.memo(FiltersWithSubFilters);
