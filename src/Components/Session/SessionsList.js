import React, { useEffect, useReducer, useState } from "react";
import { emptyFilterData, setFullList } from "Components/Filters/store/actions";
import { getSessionTypes, getTrackList } from "./utils/filterData";
import {
  paginationReducer,
  paginationState,
} from "Components/Paginate/reducer";
import { useDispatch, useSelector } from "react-redux";

import DaysList from "Components/Filters/DaysList";
import FilterWrapper from "Components/Filters/FilterWrapper";
import FiltersSectionContainer from "Components/Filters/FiltersSectionContainer";
import FiltersSectionMobileButton from "Components/Filters/FiltersSectionMobileButton";
import FiltersWithSubFilters from "Components/Filters/FiltersWithSubFilters";
import HorizontalSponsorBanner from "Components/Banners/HorizontalSponsorBanner";
import Loader from "Components/Loader";
import { Paginate } from "../Paginate/Paginate";
import ScopedSearch from "Components/Search/ScopedSearch";
import SessionTab from "./SessionTab";
import VerticalSponsorBanner from "Components/Banners/VerticalSponsorBanner";
import { dataTypes } from "store/utils/dataTypes";
import { filtersConfig } from "../../util/staticData/Components/Filters/Filters";
import getPastAndUpcomingSessions from "../../util/getPastAndUpcomingSessions";
import { getPayload } from "store/actions";
import { pageTypes } from "Components/Filters/store/reducer";
import sessionsListStyles from "./scss/sessions-list.module.scss";
import { useBoolean } from "hooks/useToggle";
import useClearPagination from "hooks/useClearPagination";
import useGetPageByPathname from "hooks/useGetPageByPathname";
import useSaveBreadcrumbs from "hooks/useSaveBreadcrumbs";
import useSessionsFilter from "hooks/useSessionsFilter";

const SessionsList = () => {
  const dispatch = useDispatch();
  useSaveBreadcrumbs();
  /**@type {Session[]} */
  const sessionsData = useSelector((state) => state.global.sessions);
  const { pageTitle, isOnDemand } = useGetPageByPathname();
  const [
    isMobileFilterOpen,
    { on: openMobileFilterSection, toggle: toggleMobileFilterSection },
  ] = useBoolean();
  /**
   * Only display data for a predetermined type ie(On Demand)
   */
  /**@type {Session[]} */
  const sessions = useSessionsFilter(sessionsData, pageTitle);
  const fuzzySearch = useSelector((state) => state.filters.fuzzySearching);
  /**@type {Session[]} */
  const filteredSessions = useSelector((state) => state.filters.filteredData);
  const sortedFilteredSessions = getPastAndUpcomingSessions(filteredSessions);
  const [statePaginationState, dispatchPagination] = useReducer(
    paginationReducer,
    paginationState
  );
  const [displayPage, setDisplayPage] = useState(false);
  const listRef = React.createRef();

  const getFilter = () => {
    if (isOnDemand) {
      // Ondemand Filters
      return (
        <FilterWrapper
          page="Sessions List"
          filterBar={[
            <FiltersWithSubFilters
              key={filtersConfig.sessionTrack.name}
              name={filtersConfig.sessionTrack.name}
              filterBy={filtersConfig.sessionTrack.subFilterSetting.key}
              subFilters={getTrackList(
                sessions,
                filtersConfig.sessionTrack.subFilterSetting
              )}
            />,
          ]}
          search={<ScopedSearch page="Sessions List" withClearButton={true} />}
        />
      );
    }
    // Sessions Filters
    return (
      <FilterWrapper
        page="Sessions List"
        days={<DaysList filterByToday={true} page="Sessions List" />}
        filterBar={[
          <FiltersWithSubFilters
            key={filtersConfig.sessionType.name}
            name={filtersConfig.sessionType.name}
            filterBy={filtersConfig.sessionType.subFilterSetting.key}
            subFilters={getSessionTypes(
              sessions,
              filtersConfig.sessionType.subFilterSetting
            )}
            page="Sessions List"
          />,
          <FiltersWithSubFilters
            key={filtersConfig.sessionTrack.name}
            name={filtersConfig.sessionTrack.name}
            filterBy={filtersConfig.sessionTrack.subFilterSetting.key}
            subFilters={getTrackList(
              sessions,
              filtersConfig.sessionTrack.subFilterSetting
            )}
            page="Sessions List"
          />,
          // <ResetFilters
          //   key={filtersConfig.clear.name}
          //   name={filtersConfig.clear.name}
          //   filterBy={filtersConfig.clear.filterBy}
          //   tabIndex="0"
          // />,
        ]}
        search={<ScopedSearch page="Sessions List" withClearButton={true} />}
      />
    );
  };

  /**
   * Sort Session data
   *
   * @param {Array.<Session>} data session data
   *
   * @returns {Array.<Session>} sorted by start and end time and session name or by search relevance
   */
  const sortResultsInfo = (data) => {
    if (fuzzySearch) {
      return data;
    }
    // return sortResults(data, "startEndTimeAndName");
    return sortedFilteredSessions.sortedSessions;
  };

  useEffect(() => {
    if (!sessions) {
      // Get sessions data
      dispatch(getPayload(dataTypes.sessions));
    } else if (!displayPage && filteredSessions) {
      /**
       * Clean up carried over filter data for previous page
       */
      dispatch(emptyFilterData());
    } else if (!filteredSessions && sessions) {
      // Set filters and sessions
      dispatch(
        setFullList({
          data: sessions,
          page: pageTypes.SESSION,
        })
      );
      setDisplayPage(true);
    }
  }, [sessions, dispatch, filteredSessions, displayPage]);

  useClearPagination(dispatchPagination);

  if (!sessions && !displayPage) {
    return <Loader />;
  }

  return displayPage ? (
    <section>
      <div
        className={`${sessionsListStyles.sessionList} ${sessionsListStyles.titleWrapper}`}
      >
        <h1 className={sessionsListStyles.title}>
          {sortedFilteredSessions.currentSessions ? pageTitle : "Past Sessions"}
        </h1>
        <FiltersSectionMobileButton
          isMobileFilterOpen={isMobileFilterOpen}
          toggleMobileFilterSection={toggleMobileFilterSection}
        />
      </div>

      <div className={sessionsListStyles.flex}>
        {/* This <div /> is a container for layout since we are using flex and need to render the banner below the filters */}
        <div>
          <FiltersSectionContainer
            isMobileFilterOpen={isMobileFilterOpen}
            openMobileFilterSection={openMobileFilterSection}
          >
            <div className={sessionsListStyles.innerFlex}>{getFilter()}</div>
          </FiltersSectionContainer>
          <VerticalSponsorBanner pageName="sessions" />
        </div>
        <div
          className={sessionsListStyles.sessionList}
          autoFocus={true}
          ref={listRef}
          tabIndex="-1"
        >
          {filteredSessions.length ? (
            sortResultsInfo(filteredSessions)
              .slice(
                statePaginationState.startIndex,
                statePaginationState.endIndex
              )
              .map((data, i) => {
                if (
                  data.firstPastSession &&
                  sortedFilteredSessions.currentSessions
                ) {
                  return (
                    <div style={{ borderTop: "1px solid" }}>
                      <div
                        className={`${sessionsListStyles.sessionList} ${sessionsListStyles.pastSessionsTitle}`}
                      >
                        <h1 className={sessionsListStyles.title}>
                          Past Sessions
                        </h1>
                      </div>
                      <SessionTab data={data} key={`${data.sessionId}-${i}}`} />
                    </div>
                  );
                } else
                  return (
                    <SessionTab data={data} key={`${data.sessionId}-${i}}`} />
                  );
              })
          ) : (
            <p className={sessionsListStyles.noResults}>
              There are no sessions that match your search
            </p>
          )}

          <Paginate
            large
            total={filteredSessions.length}
            startIndex={statePaginationState.startIndex}
            dispatch={dispatchPagination}
            listRef={listRef}
            pageTitle={pageTitle}
            page="sessions list"
          />
        </div>
      </div>
      <HorizontalSponsorBanner pageName="sessions" />
    </section>
  ) : (
    <Loader />
  );
};

export default SessionsList;
