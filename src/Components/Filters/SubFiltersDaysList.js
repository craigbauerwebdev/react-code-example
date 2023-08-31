import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import OEPAnalytics from "Components/OEPAnalytics";
import ReactDOM from "react-dom";
import filterStyles from "./scss/filters.module.scss";
import { getDays } from "Components/Session/utils/filterData";
import { setByValue } from "./store/actions";

/**
 * List of sub filters
 * @param {array} filters list of sub filters
 * @param {boolean} active
 * @param {string} page tracking value
 */
const SubFiltersList = ({ active, page, UIState }) => {
  const dispatch = useDispatch();
  const fullList = useSelector((state) => state.filters.fullList);
  const [listSet, setListSet] = useState(false);
  const [elementRender, setElementRender] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const activeFilterList = useSelector(
    (state) => state.filters.activeFilterList
  );
  const setActiveState = useCallback(
    (days, activeDay) => {
      if (activeDay) {
        /**
         * Check to see if the activeDay value is in the list of day.
         * When timezone changes the activeDay may not be in the list of days
         */
        const hasDay = days.filter((day) => day.date === activeDay);
        const setActiveDay = days.map((day) => {
          day.active = day.date === activeDay;

          return day;
        });

        if (hasDay.length) {
          // Filter by the activeDay
          dispatch(
            setByValue({
              active: true,
              value: activeDay,
              key: "Day",
            })
          );
        } else {
          // Filter by All days
          dispatch(
            setByValue({
              active: true,
              value: "All",
              key: "Day",
            })
          );
        }

        return setActiveDay;
      }

      return days;
    },
    [dispatch]
  );
  const filterDay = ({ value, active }) => {
    // If user is clicking the currently active item do nothing.
    if (!active) {
      dispatch(
        setByValue({
          active: true,
          value,
          key: "Day",
        })
      );
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

  // If there is not active day set the active day to All
  useEffect(() => {
    if (!activeFilterList?.Day) {
      dispatch(
        setByValue({
          active: true,
          value: "All",
          key: "Day",
        })
      );
    }
  }, [activeFilterList, fullList, dispatch]);

  // Run every time timezone and activeFilterList.Day changes
  useEffect(() => {
    setListSet(
      // Pass a list of days for the current timezone
      setActiveState(getDays(fullList, UIState.timezone), activeFilterList.Day)
    );
  }, [fullList, UIState.timezone, activeFilterList.Day, setActiveState]);

  if (!elementRender) {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      className={`${filterStyles.filterSubFilterHolder} ${
        showFilter && filterStyles.active
      }`}
    >
      <div className={filterStyles.days}>
        {listSet.map((day) => (
          <OEPAnalytics
            key={day.date}
            page={page}
            componentType="Button"
            url={`Select ${day.date}`}
            componentName={`Select ${day.date} Filter`}
          >
            <button
              onClick={filterDay.bind(this, {
                active: day.active,
                value: day.date,
                key: "Day",
              })}
              className={`${day.active ? filterStyles.active : ""}`}
            >
              {day.date}
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
  // Only re-render component if timezone or active change state.
  if (
    prevProps.active === nextProps.active &&
    prevProps.UIState.timezone === nextProps.UIState.timezone
  ) {
    return true;
  }

  return false;
}

export default React.memo(SubFiltersList, areEqual);
