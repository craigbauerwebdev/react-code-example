import OEPAnalytics from "Components/OEPAnalytics";
import React from "react";
import { actionTypesFiltersUI } from "./reducer";
import { filterDataNonConcatenating } from "./store/actions";
import filterStyles from "./scss/filters.module.scss";
import { useDispatch } from "react-redux";

/**
 * Clear Filters
 * @param {string} name this is the key that will be used to save the filter in the store
 * @param {string} filterBy this is what is used to do the filtering in the global filters store
 * @param {function} dispatchUI local store dispatch function
 * @param {string} defaultTo when cleared should something be active ie(all Speakers) filter
 * @param {string} resetToFilterType what object is the default item stored in the local UI store
 */
const ResetFiltersWithTitle = ({
  name,
  filterBy,
  dispatchUI,
  defaultTo,
  resetToFilterType,
  page,
  title,
}) => {
  const dispatch = useDispatch();
  const filterData = () => {
    // Clear filters
    dispatch(filterDataNonConcatenating(filterBy));
    dispatchUI({
      type: actionTypesFiltersUI.CLEAR_FILTERS_UI,
      payload: {
        value: defaultTo,
        filterType: resetToFilterType,
      },
    });
  };

  return (
    <div
      className={`${filterStyles.filtersTopBar} ${
        title && filterStyles.spaceBetween
      }`}
    >
      {title && <span>{title}</span>}
      <OEPAnalytics
        page={page}
        componentType="Button"
        url="Clear filters"
        componentName="Clear filters"
      >
        <button onClick={filterData}>{name}</button>
      </OEPAnalytics>
    </div>
  );
};

export default ResetFiltersWithTitle;
