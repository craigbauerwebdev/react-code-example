import React, { useEffect, useState } from "react";
import { setByValue, setToActiveByValue } from "./store/actions";
import { useDispatch, useSelector } from "react-redux";

import ExpandToggle from "Components/Buttons/ExpandToggle";
import OEPAnalytics from "Components/OEPAnalytics";
import ReactDOM from "react-dom";
import filterStyles from "./scss/filters.module.scss";
import isEmpty from "lodash/isEmpty";
import { useQueryState } from "use-location-state";

/**
 * List of sub filters
 * @param {array} filters list of sub filters
 * @param {boolean} active
 * @param {string} page tracking value
 * @param {string} name
 */
const SubFiltersList = ({ filters, active, page, name, filterBy }) => {
  const dispatch = useDispatch();
  const activeFilterList = useSelector(
    (state) => state.filters.activeFilterList
  );
  const [elementRender, setElementRender] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [filtersList, setFiltersList] = useState(null);
  const [openSection, setOpenSection] = useState(false);
  const [queryFilter, updateQueryFilter] = useQueryState(name, []);

  const toggleFilter = ({ value, key, active }) => {
    dispatch(
      setByValue({
        key,
        value,
        active: !active,
      })
    );

    if (!active && !queryFilter.includes(value)) {
      updateQueryFilter([...queryFilter, value]);
    } else if (active) {
      updateQueryFilter(queryFilter.filter((item) => item !== value));
    }
  };

  const toggleSection = () => setOpenSection((openSection) => !openSection);

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
        const filtersList = filters.map((filter) => {
          if (
            activeFilterList[value].includes(filter.name) ||
            activeFilterList[value].includes(filter.value)
          ) {
            filter.active = true;
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
  }, [filters, activeFilterList]);

  useEffect(() => {
    if (isEmpty(queryFilter)) {
      return;
    }

    setOpenSection(true);
    queryFilter.forEach((value) => {
      dispatch(
        setToActiveByValue({
          key: filterBy,
          value,
        })
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!elementRender) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={filterStyles.filterWithBorder}>
      <h4 className={filterStyles.title}>
        {name.replace("Filter by ", "")}
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
        <div
          className={`${filterStyles.filterSubFilterHolder} ${
            showFilter && filterStyles.active
          }`}
        >
          <div className={filterStyles.list}>
            {filtersList?.map((filter) => (
              <OEPAnalytics
                page={page}
                componentType="Button"
                key={`Select ${filter.name}`}
                url={filter.name}
                componentName={`Select ${filter.name} Filter`}
              >
                <div>
                  <input
                    id={filter.name}
                    type="checkbox"
                    checked={filter.active}
                    onChange={toggleFilter.bind(this, {
                      value: filter.value || filter.name,
                      key: filter.key,
                      active: filter.active,
                    })}
                    className={`${filter.active ? filterStyles.active : ""}`}
                  />
                  <label htmlFor={filter.name}>{filter.name}</label>
                </div>
              </OEPAnalytics>
            ))}
          </div>
        </div>
      )}
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

export default React.memo(SubFiltersList, areEqual);
