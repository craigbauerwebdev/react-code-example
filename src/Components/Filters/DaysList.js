import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ExpandToggle from "Components/Buttons/ExpandToggle";
import OEPAnalytics from "Components/OEPAnalytics";
import { actionTypesFiltersUI } from "./reducer";
import filterStyles from "./scss/filters.module.scss";
import formatDate from "util/formatDate";
import { getDays } from "Components/Session/utils/filterData";
import { setByValue } from "./store/actions";
import { useQueryState } from "use-location-state";

/**
 * Days list
 * @param {string} page tracking value
 * @param {function} dispatchUI local store dispatch function
 * @param {object} UIState current local UI state
 * @param {boolean} filterByToday flag to toggle is default load filter is today
 */
const DaysList = ({ page, dispatchUI, UIState, filterByToday }) => {
  const fullList = useSelector((state) => state.filters.fullList);
  const activeFilterList = useSelector(
    (state) => state.filters.activeFilterList
  );

  const [listSet, setListSet] = useState(false);
  const [openSection, setOpenSection] = useState(false);
  const dispatch = useDispatch();
  const [hasFilteredByToday, setHasFilteredByToday] = useState(false);
  const [queryFilter, updateQueryFilter] = useQueryState("Filter by Day", "");

  // What day are we filtering by
  const checkForDay = useCallback((tz, list, dateVal) => {
    const today = tz ? formatDate({ data: new Date() }, tz) : dateVal;

    return list?.filter((day) => day.date === today).length > 0 ? today : "All"; // No day found set to all
  }, []);

  const filterDay = ({ value, active }) => {
    // If user is clicking the currently active item do nothing.
    if (!active) {
      dispatchUI({
        type: actionTypesFiltersUI.SET_ACTIVE_DAY_ITEM,
        payload: {
          active,
          value,
        },
      });
      dispatch(
        setByValue({
          active: true,
          value,
          key: "Day",
        })
      );

      updateQueryFilter(value);
    }
  };

  const toggleSection = () => setOpenSection((openSection) => !openSection);

  // Reflow of days when timezone changes
  useEffect(() => {
    // Check to see if we are currently filtering by Day
    if (activeFilterList.Day) {
      /**
       * When timezone changes days change as well.
       * See if what day the user was on before change is still available when timezone changes.
       * If day is not available set to All days
       */
      const value = checkForDay(
        false,
        getDays(fullList, UIState.timezone),
        activeFilterList.Day
      );
      // Update UI state
      dispatchUI({
        type: actionTypesFiltersUI.UPDATE_DAYS_LIST,
        payload: {
          days: getDays(fullList, UIState.timezone),
          active: false,
          value,
        },
      });
      // Filter by day
      dispatch(
        setByValue({
          active: true,
          value,
          key: "Day",
        })
      );
    }
  }, [
    fullList,
    UIState.timezone,
    activeFilterList.Day,
    checkForDay,
    dispatchUI,
    dispatch,
  ]);

  // Only run on mount
  useEffect(() => {
    // Check to see if we have already run this effect
    if (!listSet) {
      //Update the UI to have a list of days
      dispatchUI({
        type: actionTypesFiltersUI.SET_FILTERS_DAYS_LIST,
        payload: getDays(fullList, UIState.timezone),
      });
      // A flag so this effect only runs onces
      setListSet(true);
    }
  }, [fullList, UIState.timezone, listSet, dispatchUI]);

  // Default on mount filter for days by today
  useEffect(() => {
    // We have a list of days in the store and now we can filter by what today is.
    if (!hasFilteredByToday && UIState.daysList) {
      /**
       *  See if today is in list of days to set today as the active filter on component mount
       * If today is not in list set to all days
       */
      const today = (function () {
        if (queryFilter) {
          return queryFilter;
        }
        return filterByToday
          ? checkForDay(UIState.timezone, UIState.daysList, new Date())
          : "All";
      })();
      dispatchUI({
        type: actionTypesFiltersUI.SET_ACTIVE_DAY_ITEM,
        payload: {
          active: today !== "All" ? true : false,
          value: today,
        },
      });
      // Filter by day
      dispatch(
        setByValue({
          active: true,
          value: today,
          key: "Day",
        })
      );

      updateQueryFilter(today);

      setHasFilteredByToday(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filterByToday,
    hasFilteredByToday,
    fullList,
    UIState.timezone,
    UIState.daysList,
    checkForDay,
    dispatchUI,
    dispatch,
    updateQueryFilter,
  ]);

  useEffect(() => {
    if (!activeFilterList.Day && UIState.daysList) {
      const today = (function () {
        if (queryFilter) {
          return queryFilter;
        }
        return filterByToday
          ? checkForDay(UIState.timezone, UIState.daysList, new Date())
          : "All";
      })();
      dispatchUI({
        type: actionTypesFiltersUI.SET_ACTIVE_DAY_ITEM,
        payload: {
          active: today !== "All" ? true : false,
          value: today,
        },
      });
      // Filter by day
      dispatch(
        setByValue({
          active: true,
          value: today,
          key: "Day",
        })
      );

      setHasFilteredByToday(true);

      if (queryFilter) {
        setOpenSection(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    activeFilterList,
    filterByToday,
    hasFilteredByToday,
    fullList,
    UIState.timezone,
    UIState.daysList,
    checkForDay,
    dispatchUI,
    dispatch,
  ]);

  if (!UIState.daysList) {
    return null;
  }

  return (
    <div className={filterStyles.filterWithBorder}>
      <h4 className={filterStyles.title}>
        Date
        <ExpandToggle
          expanded={openSection}
          page={page}
          handleClick={toggleSection}
          ariaLabel={["filter collapse", "filter expand"]}
          ariaControls="filter-Date"
          classList={["sessionTab"]}
        />
      </h4>
      {openSection && (
        <div className={filterStyles.list}>
          {UIState.daysList.map((day) => (
            <OEPAnalytics
              key={day.date}
              page={page}
              componentType="Button"
              url={`Select ${day.date}`}
              componentName="Select Day Filter"
            >
              <div>
                <input
                  id={day.date}
                  type="checkbox"
                  checked={day.active}
                  onChange={filterDay.bind(this, {
                    active: day.active,
                    value: day.date,
                    key: "Day",
                  })}
                  className={`${day.active ? filterStyles.active : ""}`}
                />
                <label htmlFor={day.date}>{day.date}</label>
              </div>
            </OEPAnalytics>
          ))}
        </div>
      )}
    </div>
  );
};

export default DaysList;
