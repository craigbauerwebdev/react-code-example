import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ExpandToggle from "Components/Buttons/ExpandToggle";
import OEPAnalytics from "Components/OEPAnalytics";
import { actionTypesFiltersUI } from "./reducer";
import filterStyles from "./scss/filters.module.scss";
import getAnalyticsPage from "util/getAnalyticsPage";
import lodash from "lodash";
import { setByValue } from "./store/actions";
import { useLocation } from "react-router-dom";
import { useQueryState } from "use-location-state";

/**
 * Tab Filters that filter concurrently
 * @param {string} name key to be set in local store
 * @param {string} filterBy this is what is used to do the filtering in the global filters store
 * @param {function} dispatchUI local store dispatch function
 * @param {object} UIState current local UI state
 * @param {array} deleteKeys only one tab should be filtered by at a time this will remove any active filters by any other tabs.
 */
const TabFiltersConcat = ({
  name,
  filterBy,
  UIState,
  dispatchUI,
  defaultActive,
  deleteKeys,
  page,
  singleRow,
}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [item, setItem] = useState(null);
  const [openSection, setOpenSection] = useState(false);
  const [queryFilter, updateQueryFilter] = useQueryState(name, "");

  const activeFilterList = useSelector(
    (state) => state.filters.activeFilterList
  );

  const toggleSection = () => setOpenSection((openSection) => !openSection);

  const filterData = (active) => {
    // Only filter if item clicked in not already active.
    dispatchUI({
      type: actionTypesFiltersUI.SET_TAB_FILTERS,
      payload: {
        name,
        active: !active,
      },
    });
    dispatch(
      setByValue({
        active: !active,
        key: filterBy,
        value: name,
        deleteKeys: deleteKeys,
      })
    );

    if (!active && queryFilter !== name) {
      updateQueryFilter(name);
    } else if (active) {
      updateQueryFilter("");
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
    // Your item is in the store now we can set it to local state.
    if (UIState.tabFilters[name]) {
      setItem(UIState.tabFilters[name]);
    }
  }, [UIState.tabFilters, name]);

  useEffect(() => {
    if (activeFilterList[filterBy]) {
      dispatchUI({
        type: actionTypesFiltersUI.SET_TAB_FILTERS,
        payload: {
          name,
          active: true,
        },
      });
      setOpenSection(true);
    }

    if ((defaultActive || queryFilter) && lodash.isEmpty(activeFilterList)) {
      dispatchUI({
        type: actionTypesFiltersUI.SET_TAB_FILTERS,
        payload: {
          name,
          active: true,
        },
      });

      dispatch(
        setByValue({
          active: true,
          key: filterBy,
          value: name,
          deleteKeys: deleteKeys,
        })
      );
      setOpenSection(true);
    }
    if (!activeFilterList[filterBy]) {
      dispatchUI({
        type: actionTypesFiltersUI.SET_TAB_FILTERS,
        payload: {
          name,
          active: false,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    activeFilterList,
    name,
    filterBy,
    dispatchUI,
    defaultActive,
    deleteKeys,
    dispatch,
  ]);

  if (!item) {
    return null;
  }

  return (
    <div className={filterStyles.filterWithBorder}>
      <h4 className={filterStyles.title}>
        {name.replace("Filter by ", "")}
        <ExpandToggle
          expanded={openSection}
          page={getAnalyticsPage(location.pathname)}
          handleClick={toggleSection}
          ariaLabel={["filter collapse", "filter expand"]}
          ariaControls="filter-Date"
          classList={["sessionTab"]}
        />
      </h4>
      {openSection && (
        <div className={filterStyles.list}>
          <OEPAnalytics
            page={getAnalyticsPage(location.pathname)}
            componentType="Button"
            url={`Select ${name}`}
            componentName={`Select ${name} Filter`}
          >
            <div>
              <input
                id={name}
                type="checkbox"
                checked={item.active}
                onChange={filterData.bind(null, item.active)}
                className={`${item.active ? filterStyles.active : ""}`}
              />
              <label htmlFor={name}>{name}</label>
            </div>
          </OEPAnalytics>
        </div>
      )}
    </div>
  );
};

export default TabFiltersConcat;
