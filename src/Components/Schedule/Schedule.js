import React, { useCallback, useEffect, useState } from "react";
import {
  disableParentPageScroll,
  enableParentPageScroll,
} from "Components/Modal/utils/toggleParentPageScrolling";
import {
  emptyFilterData,
  refilterData,
  setFilteredData,
  setFullList,
  setFuzzySearch,
} from "Components/Filters/store/actions";
import {
  getMeetings,
  setBlockedByUsers,
} from "Components/Profile/store/actions";
import { useDispatch, useSelector } from "react-redux";

import ConfigService from "services/ConfigService";
import CreateMeetingModal from "../Profile/CreateMeetingModal";
// import FilterWrapper from "Components/Filters/FilterWrapper";
import Loader from "Components/Loader";
import { MEETING_TYPES } from "util/meetingTypes";
import OEPAnalytics from "Components/OEPAnalytics";
// import ResetFiltersWithTitle from "Components/Filters/ResetFiltersWithTitle";
import ScheduleList from "./ScheduleList";
// import ScopedSearch from "../Search/ScopedSearch";
import SvgTypes from "Components/SVG/SvgTypes";
import axios from "axios";
// import TabFiltersConcat from "Components/Filters/TabFiltersConcat";
import { dataTypes } from "store/utils/dataTypes";
import { filtersConfig } from "util/staticData/Components/Filters/Filters";
import getAnalyticsPage from "util/getAnalyticsPage";
import { getPayload } from "store/actions";
import isArrayEqual from "util/isArrayEqual";
import lodash from "lodash";
import { pageTypes } from "Components/Filters/store/reducer";
import { profileLookupKey } from "Components/Profile/store/utils/profileLookupKey";
import scheduleStyles from "./scss/schedule-page.module.scss";
import sortResults from "util/sortResults";
import { useLocation } from "react-router-dom";

const legendColors = new Map([
  [filtersConfig.scheduleMeeting.name, "green"],
  [filtersConfig.scheduleSession.name, "yellow"],
  [filtersConfig.scheduleShowcase.name, "red"],
]);

const Schedule = ({ mobileFilter }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  /** @type {User} */
  const user = useSelector((state) => state.global.user);
  const permissions = useSelector((state) => state.global.permissions);
  const schedule = useSelector((state) => state.profile.schedule);
  const networkSettings = useSelector((state) => state.global.networkSettings);
  const accountProfile = useSelector((state) => state.profile.accountProfile);
  /**
   * Editing a meeting well cause a reflow of data.
   * We track the statue of the editing so the editing modal
   * doesn't get dismissed before the user closes the modal.
   */
  const isEditing = useSelector((state) => state.profile.isEditing);
  /**@type {string[]} */
  const declinedMeetings = useSelector(
    (state) => state.profile.declinedMeetings
  );
  /**@type {Meeting[]} */
  const meetings = useSelector((state) => state.profile.meetings);
  const blockedByUsers = useSelector((state) => state.profile.blockedByUsers);
  /**@type {Session[]} */
  const sessionsData = useSelector((state) => state.global.sessions);
  const showcaseSessions = useSelector(
    (state) => state.global.showcaseSessions
  );
  const exhibitors = useSelector((state) => state.global.exhibitors);
  const [sortedSchedule, setSortedSchedule] = useState(null);
  const filteredSchedule = useSelector((state) => state.filters.filteredData);
  const filtersFullList = useSelector((state) => state.filters.fullList);
  const fuzzySearchResult = useSelector(
    (state) => state.filters.fuzzySearchResult
  );
  const searchTerm = useSelector((state) => state.filters.searchTerm);
  const fuzzySearching = useSelector((state) => state.filters.fuzzySearching);
  const [displayPage, setDisplayPage] = useState(false);
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [filterTypes, setFilterTypes] = useState(null);
  /**@type {[Meeting[], Function]} */
  const [currentMeetingList, setCurrentMeetingList] = useState([]);
  /**@type {[string[], Function]} */
  const [userMeetingIds, setUserMeetingIds] = useState(null);
  const [noData, setNoData] = useState(false);
  const [defaultListSet, setDefaultListSet] = useState(false);
  const [fetchDone, setFetchDone] = useState(false);
  // const tabsList = [
  //   filtersConfig.scheduleShowcase.filterBy,
  //   filtersConfig.scheduleRoundTable.filterBy,
  //   filtersConfig.scheduleSession.filterBy,
  //   filtersConfig.scheduleMeeting.filterBy,
  // ];
  const [meetingsChanged, setMeetingsChanged] = useState(false);
  const toggleMeetingDialog = () => {
    setShowMeetingModal(!showMeetingModal);
    if (showMeetingModal) {
      enableParentPageScroll();
    } else {
      disableParentPageScroll();
    }
  };
  const filterSessions = useCallback((sessions, schedule) => {
    if (sessions) {
      // Get saved sessions from users profile
      return sessions.filter((session) =>
        schedule.includes(`${session.sessionId}`)
      );
    }

    return [];
  }, []);

  const getMySchedule = useCallback(
    (sessionsData, showcaseSessions, meetings) => {
      if ((sessionsData && showcaseSessions) || meetings) {
        // Check network start and end time for what meetings and sessions should be displayed on the page.
        // const startDate = moment(networkSettings.networkingDates.from).tz(
        //   ConfigService.runValues.momentTimezone
        // );
        // const endDate = moment(networkSettings.networkingDates.to).tz(
        //   ConfigService.runValues.momentTimezone
        // );
        const filteredSessions = () => {
          if (!lodash.isEmpty(schedule.sessions)) {
            /**
             * Get list of sessions there are in the time frame set in overloard.
             * Based on the overloard start and end dates we only use events that match those dates.
             */
            const filteredSessions = filterSessions(
              sessionsData,
              schedule.sessions
            ).map((s) => ({ ...s, filterKey: "scheduleSession", order: 0 })); // Add filter key for grouping add order to sort by

            const filteredShowcaseSessions =
              ConfigService.runValues.hasShowcases && showcaseSessions !== null
                ? filterSessions(
                    showcaseSessions,
                    // schedule.meetings - for chime
                    schedule.sessions
                  ).map((s) => {
                    s.meetingType = "showcase";
                    return { ...s, filterKey: "scheduleShowcase", order: 0 };
                  })
                : []; // Add filter key for grouping add order to sort by

            // filterKey: "scheduleShowcase";
            // meetingType: "showcase";
            return [...filteredSessions, ...filteredShowcaseSessions];
          }

          return [];
        };
        const meetingsKey = () => {
          if (meetings.length > 0) {
            /**
             * Get list of meetings there are in the time frame set in overloard.
             * Based on the overloard start and end dates we only use events that match those dates.
             */

            const meetingsKey = meetings.map((m) => ({
              ...m,
              filterKey:
                m.meetingType?.toLowerCase() === MEETING_TYPES.SHOW_CASE
                  ? "scheduleShowcase"
                  : "scheduleMeeting",
              order: 1,
            })); // Add filter key for grouping add order to sort by

            return meetingsKey;
          }
          return [];
        };

        const combinedList = [...filteredSessions(), ...meetingsKey()]; // Make one list that has both meetings and sessions

        if (combinedList.length) {
          return sortResults(combinedList, "startEndTimeAndName"); //Sort list of sessions and meetings
        }

        return [];
      }
    },
    [filterSessions, schedule.sessions]
  );

  const filterForPermissions = (data) => {
    if (!permissions.allowNetworking) {
      return data?.filter((s) => !s.meetingType);
    } else return data;
  };

  const getTierLevelAccessForExhibitorRep = (user, profile) => {
    if (!user?.exhibitor_company_id) {
      return true;
    } else if (
      !profile?.networking.boothStaff &&
      !profile?.networking.exhibitorAdmin
    ) {
      return true;
    }

    const exhibitor =
      exhibitors &&
      exhibitors.find(
        (exhibitor) =>
          exhibitor?.exhibitor_company_id === user.exhibitor_company_id
      );

    const exhibitorTier = networkSettings.networkingMeetings.tiers.find(
      (tier) => tier.tierName === exhibitor?.membership_level
    );

    return exhibitorTier
      ? exhibitorTier?.chat || exhibitorTier?.videoChat
      : true;
  };

  useEffect(() => {
    if (ConfigService.runValues.hasShowcases && !showcaseSessions) {
      dispatch(getPayload(dataTypes.showcaseSessions));
    }
  }, [showcaseSessions, dispatch]);

  // Get user's profile schedule data
  useEffect(() => {
    const hasNoData =
      schedule &&
      !schedule.default &&
      (!schedule.meetings || schedule?.meetings.length <= 0) &&
      (!schedule.sessions || schedule?.sessions.length <= 0);

    if (hasNoData) {
      // Profile is empty no data to display
      setNoData(true);
    } else if (noData && !hasNoData) {
      setNoData(false);
    }
  }, [dispatch, user, schedule, noData]);

  // Get the data that we need to filter things by.
  useEffect(() => {
    // We have networkSettings and sessionsData here to reduce component reflow the values are pass to setSortedSchedule.
    if (!sessionsData) {
      dispatch(getPayload(dataTypes.sessions));
    } else if (sessionsData) {
      if (userMeetingIds && userMeetingIds.length > 0 && currentMeetingList) {
        /**
         * Meeting is alway true as it's default is an empty array.
         * So checking to see if there are schedule.meetings and schedule.meetings.length > 0
         * and meetings.length > 0 so we can load all the data in one shot.
         */
        if (userMeetingIds && currentMeetingList.length > 0) {
          /**
           * Only display meeting that the user has stored in there profile.
           * Meeting data will hold meeting that the user has declined.
           * The user profile data will not hold meeting that the user has declined.
           */
          const cleanMeetings = currentMeetingList
            .filter((meeting) => userMeetingIds.includes(meeting.meetingId))
            .filter((n) => !blockedByUsers.includes(n.host));

          setSortedSchedule(
            getMySchedule(sessionsData, showcaseSessions, cleanMeetings)
          );
          setMeetingsChanged(true); // Track if we have new meeting data
          setDisplayPage(true);
        } else {
          setSortedSchedule(getMySchedule(sessionsData, showcaseSessions, []));
        }
      } else {
        // There are no saved meetings, but there is schedule sessions data
        setSortedSchedule(getMySchedule(sessionsData, showcaseSessions, []));
        setMeetingsChanged(true); // Track if we have new meeting data
        setDisplayPage(true);
      }
    }
  }, [
    userMeetingIds,
    currentMeetingList,
    sessionsData,
    showcaseSessions,
    getMySchedule,
    blockedByUsers,
    dispatch,
  ]);

  /**
   * Watch for schedule.meetings and set a piece of state with that value.
   * This will help cut down on reflow otherwise we have to watch for changes on schedule and schedule.meetings.
   * This was causing reflow issues.
   */
  useEffect(() => {
    // compare values to see if a change has occurred.
    if (
      schedule.meetings &&
      !lodash.isEqual(schedule.meetings, userMeetingIds)
    ) {
      setUserMeetingIds(schedule.meetings);
    }
  }, [schedule, userMeetingIds]);

  useEffect(() => {
    if (filteredSchedule && !displayPage) {
      // Check to see if we have data in filters on first load if so empty data first.
      dispatch(emptyFilterData());
    } else if (!filteredSchedule && !displayPage) {
      // Filters is empty so we can set the page as ready to be display.
      setDisplayPage(true);
    }
  }, [dispatch, displayPage, filteredSchedule]);

  // Wait for meeting data changes
  useEffect(() => {
    if (meetings) {
      /**
       * Only run deep compare if the array length are the same.
       * If the length is different we know there has been a change.
       * Run a compare on the current data with the "new" data to see if there are any changes.
       */
      const cleanedMeeting = declinedMeetings
        ? meetings.filter((m) => !declinedMeetings.includes(m.sessionId))
        : meetings;
      const updated =
        cleanedMeeting.length === currentMeetingList.length
          ? isArrayEqual(cleanedMeeting, currentMeetingList)
          : false;

      if (!updated) {
        /**
         * For some reason meetings is reflow more then it should.
         * So set a peace of state so we can compare what we have with what is being update.
         */
        setCurrentMeetingList(cleanedMeeting);
      }
    }
  }, [meetings, currentMeetingList, declinedMeetings]);

  // Sorted Schedule is set.
  useEffect(() => {
    // Track if the store as a list already set with defaultListSet
    if (sortedSchedule && !defaultListSet) {
      dispatch(
        setFullList({
          data: sortedSchedule,
          page: pageTypes.SCHEDULE,
          checkFilters: true,
          refilterData: true,
        })
      );
      setDefaultListSet(true);
    } else if (sortedSchedule && meetingsChanged && !isEditing) {
      /**
       * We have a list in the store and there was an update to a meeting or we got a new meeting.
       * We need to reapply current filters to the new list.
       * isEditing will let us know that the user has closed the modal and there changes are done so we can update the UI.
       */
      dispatch(refilterData({ data: sortedSchedule }));
      setMeetingsChanged(false); // Track if we have new meeting data
    }
  }, [dispatch, sortedSchedule, meetingsChanged, defaultListSet, isEditing]);

  /**
   *  Get meeting data every time this page is loaded.
   * Because hosts can end meetings we need to se if the meeting has ended.
   * Meetings being ended don't sent an notification from the Notification API.
   * So we need to fetch data every time.
   */
  useEffect(() => {
    if (schedule.meetings && !fetchDone) {
      dispatch(
        getMeetings(schedule.meetings, profileLookupKey.meetings, true)
      ).then((res) => {
        setFetchDone(res);
      });
    }
  }, [schedule.meetings, dispatch, fetchDone]);

  // What data is in filtered list
  useEffect(() => {
    // Group and order filters
    const filterTypes = lodash
      .sortBy(lodash.uniqBy(filtersFullList, "filterKey"), "order")
      .filter((a) => a.filterKey && filtersConfig[a.filterKey]);

    setFilterTypes(filterTypes);
  }, [filtersFullList]);

  /* Update blockedByUsers in store */
  useEffect(() => {
    const updateBlockedByUsers = async () => {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}/retrieveBannedByList`,
        [
          {
            eventId: process.env.REACT_APP_FUZION_EVENT_ID,
            userId: user.fuzion_attendee_id,
          },
        ]
      );
      dispatch(setBlockedByUsers(response.data));
    };
    updateBlockedByUsers();
  }, [user.fuzion_attendee_id, dispatch]);

  /**
   * Meetings with attendees that have blocked the user show up randomly on click of categories
   * Adding an extra filter here to remove those meetings (if they still exist in schedule data) after the filters have been applied
   */
  useEffect(() => {
    if (blockedByUsers?.length > 0 && (filteredSchedule || fuzzySearchResult)) {
      const filteredBlockedBy = (fuzzySearchResult || filteredSchedule).filter(
        (schedule) =>
          !(
            schedule.filterKey === "scheduleMeeting" &&
            blockedByUsers.includes(schedule.host)
          )
      );
      if (
        fuzzySearchResult &&
        !lodash.isEqual(fuzzySearchResult, filteredBlockedBy)
      ) {
        dispatch(
          setFuzzySearch({
            data: filteredBlockedBy,
            isSearching: fuzzySearching,
            term: searchTerm,
          })
        );
      } else if (!lodash.isEqual(filteredSchedule, filteredBlockedBy)) {
        dispatch(setFilteredData(filteredBlockedBy));
      }
    }
  }, [
    blockedByUsers,
    dispatch,
    filteredSchedule,
    fuzzySearchResult,
    fuzzySearching,
    searchTerm,
  ]);

  useEffect(() => {
    if (!exhibitors) {
      dispatch(getPayload(dataTypes.exhibitors));
    }
  }, [dispatch, exhibitors]);

  // Show loader
  if (!noData) {
    if (!displayPage || !sortedSchedule || !fetchDone) {
      return <Loader />;
    }
  }

  return (
    <div className={scheduleStyles.schedulePage}>
      <div className={scheduleStyles.schedulePageHeaderWrapper}>
        <div className={scheduleStyles.schedulePageHeader}>
          <h2 className={scheduleStyles.innerHeader}>Schedule</h2>
        </div>
        <div>
          {(permissions.allowScheduleMeetingsAttendeeToAttendee ||
            permissions.allowScheduleMeetingsExhibitorToAttendee) &&
            (permissions.allowVideoChatAccess ||
              permissions.allowNetworkingChatMeetings) &&
            permissions.allowNetworking &&
            permissions.allowUserNetworking &&
            getTierLevelAccessForExhibitorRep(user, accountProfile) && (
              <OEPAnalytics
                page={getAnalyticsPage(location.pathname)}
                componentType="Button"
                url="Schedule a meeting modal open"
                componentName="Schedule a meeting"
              >
                <button
                  type="button"
                  className={scheduleStyles.scheduleBtn}
                  onClick={toggleMeetingDialog}
                >
                  <span className={scheduleStyles.icon}>
                    <SvgTypes name="calendar-check" />
                  </span>
                  Schedule a Meeting
                </button>
              </OEPAnalytics>
            )}
          <ul className={scheduleStyles.legend}>
            {filterTypes.map((legend) => (
              <li
                key={filtersConfig[legend.filterKey].name}
                className={
                  scheduleStyles[
                    legendColors.get(filtersConfig[legend.filterKey].name)
                  ]
                }
              >
                {filtersConfig[legend.filterKey].name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={scheduleStyles.filters}>
        {!noData && mobileFilter && mobileFilter()}
      </div>
      <ScheduleList
        filteredSchedule={
          !fuzzySearchResult
            ? filterForPermissions(filteredSchedule)
            : filterForPermissions(fuzzySearchResult)
        }
      />
      {noData && (
        <div className={scheduleStyles.emptyContent}>
          You have no scheduled events yet.
        </div>
      )}
      {filteredSchedule && filteredSchedule.length === 0 && !noData && (
        <p>No schedule found for the search criteria.</p>
      )}
      {showMeetingModal && (
        <CreateMeetingModal toggleDialog={toggleMeetingDialog} />
      )}
    </div>
  );
};

export default Schedule;
