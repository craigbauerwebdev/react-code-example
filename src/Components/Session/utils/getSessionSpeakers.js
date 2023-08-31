import ConfigService from "services/ConfigService";
import React from "react";
import { SpeakerCard } from "Components/Speaker/SpeakerCard";
import { flatMap } from "lodash";

export function getSessionSpeakers(subSessions) {
  const speakers = subSessions
    ? subSessions
        .map((subSessions) => {
          if (subSessions.presenters) {
            return subSessions.presenters.map((presenter) => ({
              ...presenter,
              presentationFiles: subSessions.presentationFiles,
            }));
          }

          return null;
        })
        .filter(Boolean)
    : null;

  return speakers ? flatMap(speakers) : null;
}

export function displaySessionSpeakers(
  speakersList,
  stylesheet,
  analyticsPageName
) {
  return (
    <div className={stylesheet["speakerList"]}>
      {speakersList.map((speaker) => (
        <SpeakerCard
          key={speaker.subSessionId + speaker.username}
          speaker={speaker}
          speakerOnly={!ConfigService.runValues.hasSubSessions}
          page={analyticsPageName}
        />
      ))}
    </div>
  );
}
