import React, { useCallback, useEffect, useState } from "react";
import {
  emptySearch,
  filterDataNonConcatenating,
  setFuzzySearch,
  setIsSearching,
} from "Components/Filters/store/actions";
import {
  filterOnCategory,
  result,
} from "Components/Search/utils/searchHelpers";
import { useDispatch, useSelector } from "react-redux";

import AccountPageSideBarFilters from "Components/Search/AccountPageSideBarFilters";
import DaysList from "Components/Filters/DaysList";
import FilterWrapper from "Components/Filters/FilterWrapper";
import OEPAnalytics from "Components/OEPAnalytics";
import SvgTypes from "Components/SVG/SvgTypes";
import axios from "axios";
import { dataTypes } from "store/utils/dataTypes";
import filterStyles from "Components/Filters/scss/filters.module.scss";
import getAnalyticsPage from "util/getAnalyticsPage";
import { removeUrlHash } from "Components/Filters/util/filterHelpers";
import { saveAnalytic } from "Components/OEPAnalytics";
import scopedSearchStyles from "./scss/scoped-search.module.scss";
import { useLocation } from "react-router-dom";
import { useQueryState } from "use-location-state";

// extract categories for schedules
const extractScheduleCategories = (data) => {
  const categories = [];
  const lookup = {};
  data.forEach((d) => {
    const meetingType = !d.meetingType
      ? "Session"
      : d.meetingType === "showcase"
      ? "Showcase"
      : "Meeting";
    if (!lookup[meetingType]) {
      categories.push(meetingType);
      lookup[meetingType] = meetingType;
    }
  });
  return categories;
};

/**
 *
 * @param {object} props
 * @param {Boolean} props.fullWidth
 * @param {Boolean} props.clearSearch
 * @param {Boolean} props.preserveFilters
 *
 * @returns {JSX.Element}
 */
const ScopedSearch = ({
  fullWidth,
  preserveFilters,
  page,
  withClearButton,
  disableSearchIcon,
  isMobile,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const searchTerm = useSelector((state) => state.filters.searchTerm);
  const pageType = useSelector((state) => state.filters.pageType);
  const fullList = useSelector((state) => state.filters.fullList);
  const [currentFilter, setCurrentFilter] = useState(null);

  const [scheduleSearchData, setScheduleSearchData] = useState(null);

  const [urlSearchQuery, updateUrlSearchQuery] = useQueryState("Search", "");

  let data = fullList;

  const [favoritesDynamicList, setFavoritesDyanmicList] = useState([]);
  const [scheduleCategories, setScheduleCategories] = useState([]);

  const onKeyUp = (e) => {
    if (e.keyCode === 13) {
      triggerSearch();
    }
  };

  const onChange = (e) => {
    const { value } = e.target;
    dispatch(setIsSearching(value));
    updateUrlSearchQuery(value);
  };

  const submitForm = (e) => {
    e.preventDefault();
    saveAnalytic({
      page: getAnalyticsPage(location.pathname),
      pageId: `Scoped Search : ${pageType}`,
      componentType: "Search",
      url: "Search",
      componentName: "Search",
    });
  };

  const triggerSearch = () => {
    const normalizedSearchTerm = searchTerm || urlSearchQuery;
    // Hold search result to preform additional filtering
    if (pageType === "schedule") {
      const scheduleData = filterOnCategory(
        scheduleSearchData,
        currentFilter,
        "scoped search"
      );

      dispatch(
        setFuzzySearch({
          data: result({
            data: scheduleData,
            searchTerm: normalizedSearchTerm,
            pageType,
            currentFilter,
          }),
          isSearching: normalizedSearchTerm !== "",
          term: normalizedSearchTerm,
          callerId: "Scoped Search: triggerSearch: if schedule",
        })
      );
    } else {
      dispatch(
        setFuzzySearch({
          data: result({
            data: fullList,
            type: currentFilter,
            pageType,
            searchTerm: normalizedSearchTerm,
          }),
          isSearching: normalizedSearchTerm !== "",
          term: normalizedSearchTerm,
          callerId: "Scoped Search: triggerSearch: else",
        })
      );
    }
  };

  const fetchAttendeesForSchedule = async (sessionId) => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_HOST}/${dataTypes.meetingAttendees}/${sessionId}`
    );
    return data.data;
  };

  // the attendees field on the session only includes an array of ids
  // we need to make a call to get the rest of the attendee information
  const formatDataToAddFullAttendeeDetails = useCallback((d) => {
    return Promise.all(
      d?.map(async (session) => {
        session.AttendeesWithDetails = await fetchAttendeesForSchedule(
          session.sessionId
        );
        if (session.subSessions) {
          session.subSessions.forEach((subSession) => {
            if (subSession.presenters) {
              subSession.presenters.forEach((presenter) => {
                session.AttendeesWithDetails = {};
                session.AttendeesWithDetails.company = presenter.organization;
                session.AttendeesWithDetails.name =
                  (presenter.preferredName
                    ? presenter.preferredName
                    : presenter.firstName) +
                  " " +
                  presenter.lastName;
              });
            }
          });
        }
        return session;
      })
    );
  }, []);

  const clearCurrentSearch = useCallback(() => {
    if (preserveFilters) {
      // If there are filters selected this will just clear the search
      //dispatch(filterDataNonConcatenating("clear"));
      dispatch(emptySearch());
    } else {
      // This will reset the data to its default state only use if there are not filters
      dispatch(filterDataNonConcatenating("clear"));
    }
  }, [dispatch, preserveFilters]);

  // TODO:
  // This "clear filters" button is duplicate and is being rendered exactly on top of other button with the same exact label.
  // All such duplicate buttons are marked with this same comment and can be searched by it in this repo

  // "Clear Filters" on SessionsList page that comes from passing "ResetFilters.js" to FilterWrapper on SessionsList.js line 72
  // "Clear Filters" on profile/schedule and favorites pages that comes from MasterDetail.js "getShowcaseFilters()" line 105
  // "Clear Filters" on any page with Scoped Search in "ScopedSearch.js" line 555
  const clearFilter = () => {
    if (pageType === "schedule" || pageType === "favorites") {
      setCurrentFilter(null);
    }
    clearCurrentSearch();
    removeUrlHash();
  };

  // only run this once if the user is on the schedule page
  useEffect(() => {
    // Avoid memory leak issue
    // https://www.debuggr.io/react-update-unmounted-component/
    let mounted = true;
    if (
      location.pathname === "/account/schedule" &&
      !scheduleSearchData &&
      data?.length > 0
    ) {
      formatDataToAddFullAttendeeDetails(data).then((newData) => {
        if (mounted) {
          setScheduleSearchData(newData);
        }
      });
    }

    return () => {
      mounted = false;
    };
  }, [
    formatDataToAddFullAttendeeDetails,
    scheduleSearchData,
    data,
    location,
    clearCurrentSearch,
  ]);

  useEffect(() => {
    //set default attendee type
    if (pageType === "favorites") {
      const favList = [];
      for (let d in data) {
        if (data[d].items.length > 0) {
          favList.push(
            data[d].type[0].toUpperCase() + data[d].type.substring(1)
          );
          continue;
        }
      }
      setFavoritesDyanmicList(favList);
    } else if (pageType === "schedule") {
      setScheduleCategories(extractScheduleCategories(data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageType, fullList]);

  useEffect(() => {
    if (
      !pageType ||
      // on my schedule page we have to wait until all "patches" to data are done before we can proceed with filtering
      (location.pathname === "/account/schedule" && !scheduleSearchData)
    ) {
      return;
    }

    if (urlSearchQuery && urlSearchQuery !== searchTerm && fullList?.length) {
      dispatch(setIsSearching(urlSearchQuery));
      triggerSearch();
    } else if (currentFilter !== null) {
      // currentFilter being null means it has initial value. Not null means it was changed
      // we need to triggerSearch one more time so it will take both category filter and scoped search value into consideration
      triggerSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    urlSearchQuery,
    pageType,
    location.pathname,
    scheduleSearchData,
    currentFilter,
  ]);

  return (
    <div>
      <section className={scopedSearchStyles.header}>
        <h4>Filters</h4>
        {withClearButton && (
          <OEPAnalytics
            componentType="Button"
            page={getAnalyticsPage(location.pathname)}
            url="Clear Search"
            componentName="Clear Search"
          >
            <div onClick={clearFilter} tabIndex="0">
              <button className={filterStyles.clearButton}>
                Clear{isMobile ? "" : " Filters"}
              </button>
            </div>
          </OEPAnalytics>
        )}
      </section>
      <form
        onSubmit={submitForm}
        className={`${scopedSearchStyles.scopedSearch} ${
          fullWidth && scopedSearchStyles.fullWidth
        }`}
      >
        <div className={scopedSearchStyles.inputWrapper} tabIndex="0">
          <label htmlFor={`${pageType}-input`} className="sr-only">
            Search
          </label>
          <div className={scopedSearchStyles.inputHolder}>
            <input
              id={`${pageType}-input`}
              name={`${pageType}-input`}
              value={searchTerm}
              onChange={onChange}
              onKeyUp={onKeyUp}
              placeholder="Search"
              type="search"
            />
          </div>
        </div>

        {!disableSearchIcon && (
          <OEPAnalytics
            page={getAnalyticsPage(location.pathname)}
            componentType="Button"
            url={`Search for '${searchTerm}'`}
            componentName="Search"
          >
            <div onClick={triggerSearch} tabIndex="0">
              <SvgTypes name="search" />
            </div>
          </OEPAnalytics>
        )}
      </form>
      {((pageType === "schedule" && scheduleCategories.length > 1) ||
        (pageType === "favorites" && favoritesDynamicList.length > 1)) && (
        <AccountPageSideBarFilters
          scheduleSearchData={scheduleSearchData}
          scheduleCategories={scheduleCategories}
          favoritesDynamicList={favoritesDynamicList}
          page={page}
          currentFilter={currentFilter}
          setCurrentFilter={setCurrentFilter}
        />
      )}
      {pageType === "webinars" && (
        <FilterWrapper
          page="networking showcases"
          days={<DaysList filterByToday={true} page="networking showcases" />}
        />
      )}
    </div>
  );
};

export default ScopedSearch;
