import React, { useEffect, useState } from "react";
import {
  filterOnCategory,
  result,
} from "Components/Search/utils/searchHelpers";
import { useDispatch, useSelector } from "react-redux";

import ExpandToggle from "Components/Buttons/ExpandToggle";
import OEPAnalytics from "Components/OEPAnalytics";
import { bpMap } from "util/bpMap";
import filterStyles from "Components/Filters/scss/filters.module.scss";
import isEmpty from "lodash/isEmpty";
import { setFuzzySearch } from "Components/Filters/store/actions";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useQueryState } from "use-location-state";
import useToggleDisplayMQ from "hooks/useToggleDisplayMQ";

export default function AccountPageSideBarFilters({
  scheduleSearchData,
  scheduleCategories,
  favoritesDynamicList,
  page,
  currentFilter,
  setCurrentFilter,
}) {
  const dispatch = useDispatch();
  const location = useLocation();

  const fullList = useSelector((state) => state.filters.fullList);
  const searchTerm = useSelector((state) => state.filters.searchTerm);
  const pageType = useSelector((state) => state.filters.pageType);
  const isMobile = useToggleDisplayMQ(bpMap.midpoint);

  const [openSection, setOpenSection] = useState(false);
  const [queryFilter, updateQueryFilter] = useQueryState("Category", "");

  const handleFilterChange = (event = {}) => {
    const { target: { value = "All" } = {} } = event;
    if (pageType === "schedule") {
      const scheduleData = filterOnCategory(scheduleSearchData, value);
      dispatch(
        setFuzzySearch({
          data: result({
            data: scheduleData ? scheduleData : fullList,
            pageType,
            searchTerm,
          }),
          isSearching: searchTerm.trim() !== "",
          term: searchTerm,
          callerId:
            "AccountPageSideBarFilters: handleFilterChange: if schedule",
        })
      );
    } else {
      dispatch(
        setFuzzySearch({
          data: result({ data: fullList, type: value, pageType, searchTerm }),
          isSearching: searchTerm.trim() !== "",
          term: searchTerm,
          callerId: "AccountPageSideBarFilters: handleFilterChange: else",
        })
      );
    }
    updateQueryFilter(value);
    setCurrentFilter(value);
  };

  const toggleSection = () => {
    setOpenSection((openSection) => !openSection);
    if (openSection) {
      handleFilterChange();
    }
  };

  useEffect(() => {
    if (
      isEmpty(queryFilter) ||
      // on my schedule page we have to wait until all "patches" to data are done before we can proceed with filtering
      (location.pathname === "/account/schedule" && !scheduleSearchData)
    ) {
      return;
    }

    setOpenSection(true);
    handleFilterChange({ target: { value: queryFilter } });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduleSearchData, location.pathname]);

  return (
    <div className={filterStyles.filterWithBorder}>
      <h4 className={filterStyles.title}>
        Category
        <ExpandToggle
          expanded={openSection}
          page={page}
          pageId="Filters"
          handleClick={toggleSection}
          ariaLabel={["filter collapse", "filter expand"]}
          ariaControls="filter-Date"
          classList={["sessionTab"]}
          disabled={isMobile}
        />
      </h4>
      {(openSection || isMobile) && (
        <div
          className={`${filterStyles.filterSubFilterHolder} ${filterStyles.active}`}
        >
          <div className={filterStyles.list}>
            {pageType === "schedule"
              ? scheduleCategories.map((filter) => (
                  <OEPAnalytics
                    page={page}
                    pageId="Filters"
                    componentType="Button"
                    key={filter}
                    url={`Select ${filter}`}
                    componentName={filter}
                  >
                    <div>
                      <input
                        id={filter}
                        name="scheduleType"
                        type="radio"
                        value={filter}
                        checked={currentFilter === filter}
                        onChange={handleFilterChange}
                        className={filterStyles.active}
                      />
                      <label htmlFor={filter}>{filter}</label>
                    </div>
                  </OEPAnalytics>
                ))
              : favoritesDynamicList.map((filter) => {
                  return (
                    <OEPAnalytics
                      page={page}
                      pageId="Filters"
                      componentType="Button"
                      key={filter}
                      url={`Select ${filter}`}
                      componentName={filter}
                    >
                      <div>
                        <input
                          id={filter}
                          name="favoriteType"
                          type="radio"
                          value={filter}
                          checked={currentFilter === filter}
                          onChange={handleFilterChange}
                          className={filterStyles.active}
                        />
                        <label htmlFor={filter}>{filter}</label>
                      </div>
                    </OEPAnalytics>
                  );
                })}
          </div>
        </div>
      )}
    </div>
  );
}
