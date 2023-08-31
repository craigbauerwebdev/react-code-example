import React, { useCallback, useEffect } from "react";
import sortResults, { sortTypes } from "util/sortResults";
import { useDispatch, useSelector } from "react-redux";

import Loader from "Components/Loader";
import PropTypes from "prop-types";
import { SessionCard } from "./SessionCard";
import ViewAll from "Components/Paginate/ViewAll";
import { checkIfTodayByCustomDate } from "util/checkIfTodayByCustomDate";
import { dataTypes } from "store/utils/dataTypes";
import featuredSessionsStyles from "./scss/featured-sessions.module.scss";
import { getPayload } from "store/actions";

/**
 * Featured Sessions
 *
 * @param {object} props
 * @param {boolean} props.byDay
 *
 * @returns {JSX.Element}
 */
const FeaturedSessions = ({ byDay = false }) => {
  const dispatch = useDispatch();
  const [filteredSessions, setFilteredSessions] = React.useState(null);
  /**@type {Session[]} */
  const sessions = useSelector((state) => state.global.sessions);
  const timezone = useSelector((state) => state.global.timezone);
  const fetchSessions = useCallback(
    /**
     *
     * @param {Session[]} sessions
     */
    (sessions) => {
      // Filter for featured sessions
      const featuredSessions = sessions.filter(
        (session) => session.featuredSession
      );

      // Sort sessions by session start/end time and then by name
      const sortedSessions = sortResults(
        featuredSessions,
        sortTypes.startEndTimeAndName
      );

      // Filter featured sessions which have a date
      const sessionsWithDate = sortedSessions.filter(
        (session) => session.sessionCustom4
      );

      if (byDay && sessionsWithDate.length > 0) {
        const todaysCustomDateFeaturedSessions = sessionsWithDate.filter(
          (session) => {
            // Accepted date format for byDay in sessionCustom4:
            // "2021-09-20T00:00:00" or "Post Event" or "2021-09-20T00:00:00|2021-09-21T00:00:00|Post Event"
            const isToday = checkIfTodayByCustomDate(
              session.sessionCustom4,
              timezone
            );
            return isToday;
          }
        );
        if (todaysCustomDateFeaturedSessions.length) {
          return setFilteredSessions(
            todaysCustomDateFeaturedSessions.slice(0, 4)
          );
        }
      }

      // If not using a custom date or if there are no sessions in todaysCustomDateFeaturedSessions,
      // return the first 4 sessions that are flagged as featured
      setFilteredSessions(sortedSessions.slice(0, 4));
    },
    [timezone, byDay]
  );

  useEffect(() => {
    if (!sessions) {
      dispatch(getPayload(dataTypes.sessions));
    } else if (sessions) {
      fetchSessions(sessions);
    }
  }, [sessions, byDay, dispatch, fetchSessions]);

  if (!sessions) {
    return <Loader />;
  }

  if (!filteredSessions?.length) {
    return null;
  }

  return (
    <div>
      <h1 className={featuredSessionsStyles.title}>Featured Sessions</h1>
      <ViewAll
        homepage={true}
        data={filteredSessions}
        path="/sessions"
        type="Sessions"
      />
      <section className={featuredSessionsStyles.featuredSessions}>
        {filteredSessions?.map((data) => (
          <SessionCard data={data} key={data.sessionId} page="homepage" />
        ))}
      </section>
    </div>
  );
};

FeaturedSessions.propTypes = {
  byDay: PropTypes.bool.isRequired,
};

export default FeaturedSessions;
