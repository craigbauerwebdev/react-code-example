import React, { Fragment, useEffect, useState } from "react";
import { emptySearch, setActiveFilterList, setByValue } from "./store/actions";
import { useDispatch, useSelector } from "react-redux";

import OEPAnalytics from "Components/OEPAnalytics";
import { levelsIndex } from "Components/Exhibitor/utils/getLevels";
import lodash from "lodash";

/**
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Filters-Active-Pills-tutorial
 * Display active filters
 * @param {array} exclude a list that excludes items form display in pills
 */
const ActiveFilters = ({ exclude }) => {
  const dispatch = useDispatch();
  const [dayItem, setDayItem] = useState(null);
  const [activeList, setActiveList] = useState(null);
  const searchTerm = useSelector((state) => state.filters.searchTerm);
  const fuzzySearching = useSelector((state) => state.filters.fuzzySearching);
  const activeFilterList = useSelector(
    (state) => state.filters.activeFilterList
  );
  const clearDay = () => {
    dispatch(
      setByValue({
        active: true,
        value: "All",
        key: "Day",
      })
    );
  };
  const clearFilters = ({ key, value }) => {
    if (!fuzzySearching) {
      dispatch(
        setByValue({
          active: false,
          value,
          key,
        })
      );
    } else {
      dispatch(
        setActiveFilterList({
          value,
          key,
        })
      );
    }
  };
  const clearSearch = () => {
    dispatch(emptySearch());
  };
  const checkName = (name) => {
    switch (name) {
      case levelsIndex.TIER_1:
      case levelsIndex.UPGRADE_3:
        return levelsIndex.PLATINUM;
      case levelsIndex.TIER_2:
      case levelsIndex.UPGRADE_2:
        return levelsIndex.GOLD;
      case levelsIndex.TIER_3:
      case levelsIndex.UPGRADE_1:
        return levelsIndex.SILVER;
      case levelsIndex.TIER_4:
      case levelsIndex.BASIC:
        return levelsIndex.BRONZE;
      default:
        return name;
    }
  };

  useEffect(() => {
    if (activeFilterList) {
      // Make a list of all non day filters
      const activeFilterArray = Object.keys(activeFilterList).filter(
        (filter) => filter !== "Day"
      );

      // Mange the Days Filter
      if (activeFilterList.Day) {
        if (activeFilterList.Day === "All") {
          setDayItem(null);
        } else {
          setDayItem(activeFilterList.Day);
        }
      } else {
        setDayItem(null);
      }
      // All non Day filters
      if (activeFilterArray.length) {
        let activeFilterArrayValues;
        const activeFilterArrayMap = (value) => ({
          key: value,
          filters: activeFilterList[value],
        });

        if (exclude) {
          activeFilterArrayValues = activeFilterArray
            .filter((filters) => !exclude.includes(filters))
            .map(activeFilterArrayMap);
        } else {
          activeFilterArrayValues = activeFilterArray.map(activeFilterArrayMap);
        }

        if (lodash.isEmpty(activeFilterArrayValues)) {
          setActiveList(null);
        } else {
          setActiveList(activeFilterArrayValues);
        }
      } else {
        setActiveList(null);
      }
    }
  }, [activeFilterList, exclude]);

  return (
    <Fragment>
      {dayItem && (
        <div>
          Day Filter:{" "}
          <OEPAnalytics
            componentType="Button"
            page="Filters"
            componentName={dayItem}
          >
            <button onClick={clearDay}>{dayItem} x</button>
          </OEPAnalytics>
        </div>
      )}
      {activeList && (
        <div>
          Filters:{" "}
          {activeList.map((item) =>
            item.filters.map((filter) => (
              <OEPAnalytics
                componentType="Button"
                page="Filters"
                url={filter}
                componentName={filter}
              >
                <button
                  onClick={clearFilters.bind(null, {
                    key: item.key,
                    value: filter,
                  })}
                  key={filter}
                >
                  {checkName(filter)} x
                </button>
              </OEPAnalytics>
            ))
          )}
        </div>
      )}
      {fuzzySearching && (
        <OEPAnalytics
          componentType="Button"
          page="Filters"
          url="Clear search"
          componentName="Clear Search"
        >
          <button onClick={clearSearch}>{searchTerm} x</button>
        </OEPAnalytics>
      )}
    </Fragment>
  );
};

export default ActiveFilters;
