import React, { useCallback, useEffect, useRef, useState } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Loader from "Components/Loader";
import Logger from "js-logger";
import { MEETING_TYPES } from "util/meetingTypes";
import Meta from "Components/Meta";
import ShowCaseExhibitors from "../ShowCaseExhibitors/ShowCaseExhibitors";
import { VideoConferencingLobby } from "./VideoConferencingLobby";
import checkForChimeMeeting from "util/checkForChimeMeeting";
import { fetchMeeting } from "util/api";
import { timeSetting as fiveMinutes } from "util/staticData/timeOffset";
import formatMeetings from "store/reducers/utils/formatMeetings";
import { isMeetingInHistory } from "util/meetingHistory";
import sessionStarted from "util/sessionStarted";
import { setCurrentMeeting } from "Components/Meeting/store/actions";
import { subtractMinutes } from "util/checkForWatchNow";
import { updateMeetingStatus } from "Components/Profile/store/actions";
import { useCurrentUser } from "hooks/useCurrentUser";
import useGuestProfiles from "hooks/useGuestProfiles";
import videoConferencingStyles from "./scss/video-conferencing.module.scss";

export const meetingStates = {
  PRE: "PRE",
  ATTENDEE_JOINABLE: "ATTENDEE_JOINABLE",
  HOST_JOINABLE: "HOST_JOINABLE",
  IN_PROGRESS: "IN_PROGRESS",
  FULL: "FULL",
  POST: "POST",
};

const STATE_CHANGE_INTERVAL = 1000 * 10; //10 seconds

const VideoConferencing = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id }: any = useParams();
  const guestProfiles = useSelector(
    (state: any) => state.profile.guestProfiles
  );

  /** @type {User} */
  const user = useSelector((state: any) => state.global.user);

  /** @type {[Meeting, Function]} */
  const [meeting, setMeeting]: any = useState(null);
  /** @type {[Exhibitor, Function]} */
  const { isHost } = useCurrentUser(meeting);

  const [meetingState, setMeetingState]: any = useState(meetingStates.PRE);

  const [reRunDataPull, setReRunDataPull]: any = useState(true);
  /** @type {[Profile, Function]} */
  const [hostProfile, setHostProfile]: any = useState(null);
  const [hostId, setHostId] = useState(null);
  const { loadProfiles }: any = useGuestProfiles();
  const mountedRef = useRef(true);
  const showLobby =
    meetingState === meetingStates.PRE ||
    meetingState === meetingStates.HOST_JOINABLE ||
    meetingState === meetingStates.ATTENDEE_JOINABLE ||
    meetingState === meetingStates.FULL;

  const joinMeeting = useCallback(() => {
    if (meetingState === meetingStates.HOST_JOINABLE) {
      const updatedMeeting = { ...meeting, meetingStatus: "started" };

      dispatch(
        updateMeetingStatus(updatedMeeting, user.fuzion_attendee_id, true)
      );
    }

    setMeetingState(meetingStates.IN_PROGRESS);
  }, [dispatch, meeting, meetingState, user.fuzion_attendee_id]);

  const getAndSetMeeting = useCallback(
    async (id) => {
      const { data = null }: any = await fetchMeeting(id);

      if (!data) {
        history.push("/page-not-found");
      }
      const [newMeeting]: any = formatMeetings([data]);

      if (
        mountedRef.current &&
        meeting?.meetingStatus !== newMeeting.meetingStatus
      ) {
        setMeeting(newMeeting);
        dispatch(setCurrentMeeting(data));
      }
    },
    [dispatch, history, meeting]
  );

  const checkMeetingState = useCallback(() => {
    const lobbyIsJoinableEarly =
      meeting &&
      sessionStarted(
        checkForChimeMeeting(meeting)
          ? subtractMinutes(
              meeting.sessionStart || meeting.startTime,
              fiveMinutes
            )
          : meeting.sessionStart || meeting.startTime
      );

    if (meeting?.meetingStatus) {
      Logger.log("meeting status", meeting.meetingStatus);
    }

    if (meeting?.isMeetingFull) {
      setMeetingState(meetingStates.FULL);
    }
    if (meeting?.meetingStatus === "ended") {
      setMeetingState(meetingStates.POST);
    }
    if (meeting?.meetingStatus === "created") {
      if (lobbyIsJoinableEarly) {
        if (isHost) {
          setMeetingState(meetingStates.HOST_JOINABLE);
        } else {
          setMeetingState(meetingStates.ATTENDEE_JOINABLE);
        }
      } else {
        setMeetingState(meetingStates.PRE);
      }
    }

    if (meeting?.meetingStatus === "started") {
      if (isMeetingInHistory(meeting.sessionId)) {
        setMeetingState(meetingStates.IN_PROGRESS);
      } else {
        setMeetingState(meetingStates.ATTENDEE_JOINABLE);
      }
    }
  }, [meeting, isHost]);

  const pullData = useCallback(
    /**
     * As long as the meeting is in pre state or an attendee can join
     * we recheck the meetings data to see if the meeting is full or has started or has ended
     *
     * @param  {Meeting} meeting
     * @param  {Function} checkMeetingState
     * @param  {String} meetingState
     *
     * @returns {Boolean}
     */
    async (meeting, checkMeetingState, meetingState) => {
      if (reRunDataPull) {
        if (meetingState === meetingStates.ATTENDEE_JOINABLE) {
          await getAndSetMeeting(meeting?.sessionId);

          setTimeout(() => {
            if (mountedRef.current) {
              setReRunDataPull(true);
            }
          }, STATE_CHANGE_INTERVAL);

          return true;
        }

        if (meetingState === meetingStates.PRE) {
          //check if meeting is now ready to join
          setTimeout(() => {
            if (mountedRef.current) {
              setReRunDataPull(true);
            }
          }, STATE_CHANGE_INTERVAL);

          checkMeetingState();

          return true;
        }
        return setReRunDataPull(false);
      }
    },
    [getAndSetMeeting, reRunDataPull]
  );

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (id && !meeting) {
      getAndSetMeeting(id);
    }

    if (meeting && meeting.host && meeting.host !== hostId) {
      // console.count(`loading host profile ${JSON.stringify(meeting.host)}`);
      loadProfiles([meeting.host]);
      setHostId(meeting.host);
    }
  }, [getAndSetMeeting, id, loadProfiles, meeting, hostId]);

  useEffect(() => {
    checkMeetingState();
  }, [isHost, getAndSetMeeting, meeting, checkMeetingState]);

  //make sure host guestProfileData is fetched
  useEffect(() => {
    if (meeting && guestProfiles?.length && !hostProfile) {
      const host = guestProfiles.find(
        (z: { attendeeId: any }) => z.attendeeId === meeting.host
      );

      setHostProfile(host);
    }
  }, [meeting, guestProfiles, hostProfile]);

  /**
   * check for state updates
   * e.g. now meeting is ready to join
   * e.g. now meeting is full
   */
  useEffect(() => {
    /**
     * reRunDataPull will trigger a reflow when we want to re check the data every 10 sec.
     * Until the meeting is in progress or if the meeting is over.
     */
    if (meeting && user && hostProfile && reRunDataPull) {
      setReRunDataPull(false);
      if (
        meetingState !== meetingStates.IN_PROGRESS &&
        meetingState !== meetingStates.POST
      ) {
        if (mountedRef.current) {
          pullData(meeting, checkMeetingState, meetingState);
        }
      }
    }
  }, [
    pullData,
    meeting,
    user,
    hostProfile,
    checkMeetingState,
    meetingState,
    reRunDataPull,
  ]);

  if (!meeting || !hostProfile || !user) {
    return (
      <div className={videoConferencingStyles.main}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={videoConferencingStyles.main}>
      <Meta
        pageTitle={`${
          meeting.meetingType === MEETING_TYPES.SHOW_CASE
            ? "Live Showcase"
            : "Video Meeting"
        }`}
        pageDescription={meeting.sessionName}
      />

      <div>
        {showLobby && (
          <VideoConferencingLobby
            meeting={meeting}
            hostProfile={hostProfile}
            meetingState={meetingState}
            joinMeeting={joinMeeting}
            hostHasBegun={meeting.meetingStatus === "started"}
            url={`/product-showcase-video/${meeting.meetingId}/${meeting.meetingTitle}`}
          />
        )}
        {meetingState === meetingStates.IN_PROGRESS && (
          <Redirect
            to={`/product-showcase-video/${meeting.meetingId}/${meeting.meetingTitle}`}
          />
        )}
        {meetingState === meetingStates.POST && (
          <Redirect to="/meeting-ended" />
        )}
      </div>
      {<ShowCaseExhibitors showcase={meeting} hostProfile={hostProfile} />}
    </div>
  );
};
export default VideoConferencing;
