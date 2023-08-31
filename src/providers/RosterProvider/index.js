import React, { useContext, useEffect, useMemo, useRef, useState } from "react";

import { DefaultModality } from "amazon-chime-sdk-js";
import { useAudioVideo } from "../AudioVideoProvider";
import { useMeetingManager } from "../MeetingProvider";

const RosterContext = React.createContext(null);
const RosterProvider = ({ children }) => {
  const meetingManager = useMeetingManager();
  const audioVideo = useAudioVideo();
  const rosterRef = useRef({});
  const [roster, setRoster] = useState({});
  const value = useMemo(
    () => ({
      roster,
    }),
    [roster]
  );

  //meetingManager.getAttendee;
  useEffect(() => {
    if (!audioVideo) {
      return;
    }
    const rosterUpdateCallback = async (
      chimeAttendeeId,
      present,
      externalUserId
    ) => {
      if (!present) {
        delete rosterRef.current[chimeAttendeeId];
        setRoster((currentRoster) => {
          const { [chimeAttendeeId]: _, ...rest } = currentRoster;
          return { ...rest };
        });
        return;
      }
      const attendeeId = new DefaultModality(chimeAttendeeId).base();
      if (attendeeId !== chimeAttendeeId) {
        return;
      }
      const inRoster = rosterRef.current[chimeAttendeeId];
      if (inRoster) {
        return;
      }
      let attendee = { chimeAttendeeId };
      if (externalUserId) {
        attendee.externalUserId = externalUserId;
      }
      if (meetingManager.getAttendee) {
        const externalData = await meetingManager.getAttendee(
          attendeeId,
          externalUserId
        );
        attendee = { ...attendee, ...externalData };
      }
      rosterRef.current[attendeeId] = attendee;
      setRoster((oldRoster) => ({
        ...oldRoster,
        [attendeeId]: attendee,
      }));
    };
    audioVideo.realtimeSubscribeToAttendeeIdPresence(rosterUpdateCallback);

    return () => {
      setRoster({});
      rosterRef.current = {};
      audioVideo.realtimeUnsubscribeToAttendeeIdPresence(rosterUpdateCallback);
    };
  }, [audioVideo, meetingManager]);

  return React.createElement(
    RosterContext.Provider,
    { value: value },
    children
  );
};

function useRosterState() {
  const state = useContext(RosterContext);
  if (!state) {
    throw new Error("userRosterState must be used within RosterProvider");
  }
  return state;
}

export { RosterProvider, useRosterState };
//# sourceMappingURL=index.js.map
