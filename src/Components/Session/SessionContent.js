import React, { Fragment } from "react";
import {
  displaySessionSpeakers,
  getSessionSpeakers,
} from "Components/Session/utils/getSessionSpeakers";
import sortResults, { sortTypes } from "util/sortResults";

import ConfigService from "services/ConfigService";
import SessionExternalLink from "./SessionExternalLink";
import SpeakerSubSessionCard from "./SpeakerSubSessionCard";
import lodash from "lodash";
import singleSessionStyles from "./scss/single-session.module.scss";

const SessionContent = ({
  page,
  data: { sessionExternalLink, description, subSessions },
}) => {
  const speakersList = getSessionSpeakers(subSessions);

  const sortSubSession = (sessions) => {
    // Check first item in array for subSessionOrder.
    const { subSessionOrder = null } = sessions[0];

    if (subSessionOrder && typeof subSessionOrder === "number") {
      // If sub sessions have the subSessionOrder key and its value is a number then sort sub-sessions by that value.
      return lodash.orderBy(sessions, ["subSessionOrder"], ["asc"]);
    }
    // Sort by start time
    return sortResults(sessions, sortTypes.lastFirstChar);
  };
  return (
    <Fragment>
      <div
        className={singleSessionStyles.description}
        dangerouslySetInnerHTML={{ __html: description }}
      />
      {sessionExternalLink && (
        <SessionExternalLink
          page={page}
          sessionExternalLink={sessionExternalLink}
        />
      )}
      {ConfigService.runValues.hasSubSessions && subSessions && (
        <div className={singleSessionStyles.speakerList}>
          <div className={singleSessionStyles.subSessionCards}>
            {sortSubSession(subSessions).map((s) => (
              <SpeakerSubSessionCard
                data={s}
                key={s.subSessionId}
                page={page}
              />
            ))}
          </div>
        </div>
      )}
      {!ConfigService.runValues.hasSubSessions &&
        subSessions &&
        displaySessionSpeakers(speakersList, singleSessionStyles, page)}
    </Fragment>
  );
};

export default SessionContent;
