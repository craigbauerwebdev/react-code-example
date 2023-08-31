import React, { Fragment, useCallback, useEffect, useState } from "react";
import { getMeetings, getProfileData } from "Components/Profile/store/actions";
import { useDispatch, useSelector } from "react-redux";

import ConfigService from "services/ConfigService";
import Loader from "Components/Loader";
import OEPAnalytics from "Components/OEPAnalytics";
import ScheduleCard from "./ScheduleCard";
import SvgTypes from "Components/SVG/SvgTypes";
import { dataTypes } from "store/utils/dataTypes";
import formatDate from "util/formatDate";
import { getPayload } from "store/actions";
import lodash from "lodash";
import moment from "moment-timezone";
import { profileLookupKey } from "Components/Profile/store/utils/profileLookupKey";
import { retrievedPayloads } from "store/utils/retrievedPayloads";
import scheduleStyles from "./scss/schedule.module.scss";
import sortResults from "util/sortResults";

const AttendeeSchedule = () => {
  const timezone = useSelector((state) => state.global.timezone);
  const schedule = useSelector((state) => state.profile.schedule);
  const meetings = useSelector((state) => state.profile.meetings);
  const blockedByUsers = useSelector((state) => state.profile.blockedByUsers);
  /**@type {Session[]} */
  const sessionsData = useSelector((state) => state.global.sessions);
  const showcasesData = useSelector((state) => state.global.showcaseSessions);
  /** @type {User} */
  const user = useSelector((state) => state.global.user);
  const [page, setPage] = useState(null);
  const [displayList, setDisplayList] = useState(null);
  const [daysList, setDaysList] = useState(null);
  const [groupedSchedule, setGroupedSchedule] = useState(null);
  const [mySchedule, setMySchedule] = useState(null);
  const [scheduleSet, setScheduleSet] = useState(null);
  const todaysData = formatDate(
    { data: new Date(), format: "ddd D" },
    timezone
  );
  const dispatch = useDispatch();
  const groupMySchedule = useCallback(
    (sortedSchedule) => {
      return sortedSchedule.map((event) => {
        event.day = formatDate(
          { date: event.sessionStart, format: "ddd D" },
          timezone
        );

        return event;
      });
    },
    [timezone]
  );
  const decreasePageNumber = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };
  const increasePageNumber = () => {
    if (displayList.length - 1 > page) {
      setPage(page + 1);
    }
  };

  // Get user profile schedule data
  useEffect(() => {
    // Check to see if we already have gotten the user schedule
    if (user && !retrievedPayloads.has(profileLookupKey.schedule)) {
      dispatch(getProfileData(dataTypes.schedule, profileLookupKey.schedule));
    } else if (
      lodash.isEmpty(schedule) &&
      retrievedPayloads.has(profileLookupKey.schedule)
    ) {
      // We have gotten the user schedule and its empty
      // By setting an empty array this will end the loader and trigger the sorry message
      setDisplayList([]);
    } else if (
      !lodash.isEmpty(schedule) &&
      retrievedPayloads.has(profileLookupKey.schedule)
    ) {
      // we have user schedule and we set it to local
      setScheduleSet(schedule);
    }
  }, [dispatch, user, schedule]);

  // Get all sessions data
  useEffect(() => {
    if (!sessionsData) {
      dispatch(getPayload(dataTypes.sessions));
    } else if (ConfigService.runValues.hasShowcases && !showcasesData) {
      dispatch(getPayload(dataTypes.showcaseSessions));
    }
  });

  // Get all meeting data
  useEffect(() => {
    if (
      schedule.meetings &&
      !retrievedPayloads.has(profileLookupKey.meetings)
    ) {
      dispatch(getMeetings(schedule.meetings, profileLookupKey.meetings));
    }
  }, [schedule, dispatch]);

  // Make list of webinars and profile session events
  useEffect(() => {
    if (scheduleSet && sessionsData && meetings) {
      const filteredByBlocksMeetings = meetings.filter((n) => {
        return !blockedByUsers.includes(n.host);
      });
      /**
       * Avoid loading data in waves.
       * Load the whole UI when we have all the data.
       */
      if (
        !scheduleSet.meetings ||
        (scheduleSet.meetings && scheduleSet.meetings.length <= 0) ||
        (scheduleSet.meetings &&
          scheduleSet.meetings.length > 0 &&
          meetings.length > 0)
      ) {
        const filterSessions = () => {
          if (scheduleSet.sessions && sessionsData) {
            let showcases = showcasesData !== null ? showcasesData : [];
            // Get list of Sessions that user has saved to there profile
            return [...sessionsData, ...showcases].filter((session) =>
              scheduleSet?.sessions.includes(`${session.sessionId}`)
            );
          }

          return [];
        };
        setMySchedule([
          ...filterSessions(),
          ...(filteredByBlocksMeetings ? filteredByBlocksMeetings : []),
        ]);
      }
    }
  }, [scheduleSet, sessionsData, meetings, blockedByUsers, showcasesData]);

  useEffect(() => {
    if (mySchedule) {
      // Group list by date
      setGroupedSchedule(
        lodash.groupBy(
          groupMySchedule(sortResults(mySchedule, "startEndTimeAndName")),
          "day"
        )
      );
    }
  }, [groupMySchedule, mySchedule]);

  // Make list for displaying data
  useEffect(() => {
    if (groupedSchedule && timezone) {
      const orderArrayGroup = [];
      const today = moment.tz(new Date(), timezone).format();
      const matchingDay = [];

      // Loop for all saved days
      for (const [index, [key]] of Object.entries(
        Object.entries(groupedSchedule)
      )) {
        const dayVal = moment.tz(key, "ddd D", timezone).format();

        orderArrayGroup.push(groupedSchedule[key]);

        if (moment.tz(dayVal, timezone).isSameOrAfter(today, "day")) {
          // Make a list of all day the are today or after today
          matchingDay.push(index);
        }
      }

      if (matchingDay.length > 0) {
        setPage(Number(matchingDay[0])); // Get first date the match since list is order first day should be today or closest day to today.
      } else {
        setPage(orderArrayGroup.length - 1); // There is no saved user data for today or any day after get the last day in the list.
      }

      setDisplayList(orderArrayGroup); // Array of arrays for each day in order by day
      setDaysList(Object.keys(groupedSchedule)); // full array of days in order by day
    }
  }, [groupedSchedule, timezone]);

  if (!displayList) {
    return (
      <div className={scheduleStyles.scheduleWrapper}>
        <Loader loaderType="midSize" />
      </div>
    );
  }
  return (
    <div className={scheduleStyles.scheduleWrapper}>
      {displayList.length > 0 && (
        <Fragment>
          <div className={scheduleStyles.date}>
            <OEPAnalytics
              componentType="Button"
              page="My Schedule"
              url="Go to Previous Date"
              componentName="Go to Previous Date"
            >
              <button
                title="Go to Previous Date"
                className={scheduleStyles.iconButton}
                onClick={decreasePageNumber}
                type="button"
                aria-label="Go to Previous Date"
              >
                <span
                  className={`${scheduleStyles.karet} ${
                    page > 0 ? scheduleStyles.iconBlue : ""
                  }`}
                >
                  <SvgTypes name="karet-left" />
                </span>
              </button>
            </OEPAnalytics>
            <div>
              <strong>
                {daysList[page] === todaysData ? "Today" : daysList[page]}
              </strong>
            </div>
            <OEPAnalytics
              componentType="Button"
              page="My Schedule"
              url="Go to Next Date"
              componentName="Go to Next Date"
            >
              <button
                title="Go to Next Date"
                className={scheduleStyles.iconButton}
                onClick={increasePageNumber}
                type="button"
                aria-label="Go to Next Date"
              >
                <span
                  className={`${scheduleStyles.karet} ${
                    displayList.length - 1 > page ? scheduleStyles.iconBlue : ""
                  }`}
                >
                  <SvgTypes name="karet-right" />
                </span>
              </button>
            </OEPAnalytics>
          </div>

          <hr className={scheduleStyles.hr} />
        </Fragment>
      )}
      {displayList.length ? (
        displayList.slice(page, page + 1).map((day, i) => (
          <Fragment key={daysList[i]}>
            {day.map((event) => {
              return (
                <div key={event.sessionId}>
                  <ScheduleCard event={event} />
                </div>
              );
            })}
            <hr className={scheduleStyles.hr} />
          </Fragment>
        ))
      ) : (
        <span className={scheduleStyles.sorryMessage}>
          Nothing added to your schedule yet
        </span>
      )}
    </div>
  );
};

export default AttendeeSchedule;
