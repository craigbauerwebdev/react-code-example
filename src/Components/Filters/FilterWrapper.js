import React, { Children, Fragment, useEffect, useReducer } from "react";
import { actionTypesFiltersUI, filterStateUI, filtersReducer } from "./reducer";
import { useDispatch, useSelector } from "react-redux";

import { setTimezoneFilters } from "./store/actions";
import styles from "Components/Filters/scss/filters.module.scss";

/**
 * A wrapper that holders all filters
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Filters
 * @param {ReactComponentElement} days react component for days filters
 * @param {Array} days Array of react filter components
 * @param {string} page tracking value
 * @param {ReactComponentElement} search react component for page searching
 * @param {activeFilters} activeFilters react component for filters pills
 * @param {object} match react router information
 */
const FilterWrapper = ({
  days,
  filterBar,
  page,
  search,
  activeFilters,
  topBar,
}) => {
  const dispatch = useDispatch();
  const timezone = useSelector((state) => state.global.timezone);
  const [filtersState, dispatchFilters] = useReducer(
    filtersReducer,
    filterStateUI
  );

  const sortFilters = (filters) =>
    filters?.filter((f) => f.key !== "Clear Filters");

  const getClearButton = (filters) =>
    filters?.filter((f) => f.key === "Clear Filters");

  // Get saved timezone and pass it to filters store
  useEffect(() => {
    dispatchFilters({
      type: actionTypesFiltersUI.SET_FILTERS_TIMEZONE,
      payload: timezone,
    });
    dispatch(setTimezoneFilters(timezone));
  }, [timezone, dispatch]);

  return (
    <Fragment>
      {topBar && (
        <div>
          {topBar &&
            Children.map(topBar, (topBar) => {
              if (React.isValidElement(topBar)) {
                // Clone Days filter and pass props to component
                return React.cloneElement(topBar, {
                  dispatchUI: dispatchFilters,
                  UIState: filtersState,
                  page,
                });
              }
            })}
        </div>
      )}
      <div id="filters" className={styles.sectionContainer}>
        <div className={styles.clearButtonContainer}>
          {Children.map(getClearButton(filterBar), (filterItem) => {
            if (React.isValidElement.bind(filterItem)) {
              // Clone All filter and pass props to components
              return React.cloneElement(filterItem, {
                dispatchUI: dispatchFilters,
                UIState: filtersState,
                page,
              });
            }
          })}
        </div>
        {days &&
          Children.map(days, (dayList) => {
            if (React.isValidElement(dayList)) {
              // Clone Days filter and pass props to component
              return React.cloneElement(dayList, {
                dispatchUI: dispatchFilters,
                UIState: filtersState,
                page,
              });
            }
          })}
        {filterBar && (
          <div>
            {Children.map(sortFilters(filterBar), (filterItem) => {
              if (React.isValidElement.bind(filterItem)) {
                // Clone All filter and pass props to components
                return React.cloneElement(filterItem, {
                  dispatchUI: dispatchFilters,
                  UIState: filtersState,
                  page,
                });
              }
            })}
          </div>
        )}
      </div>
      {search && search}
      <div>
        {Children.map(activeFilters, (activeFilter) => {
          if (React.isValidElement.bind(activeFilter)) {
            // Clone All filter and pass props to components
            return React.cloneElement(activeFilter, {
              dispatchUI: dispatchFilters,
              UIState: filtersState,
              page,
            });
          }
        })}
      </div>
    </Fragment>
  );
};

export default FilterWrapper;
