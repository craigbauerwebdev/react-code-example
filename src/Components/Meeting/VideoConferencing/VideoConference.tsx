import {
  Flex,
  Heading,
  UserActivityProvider,
  VideoTileGrid,
  useAudioVideo,
  useContentShareControls,
  useContentShareState,
  useLocalVideo,
  useMeetingManager,
} from "lib/chimeComponents";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import {
  addModerator,
  addModeratorReplaceHost,
  addSpeaker,
  demoteToAttendee,
  removeJoinToken,
  removeModerator,
  removeUser,
} from "util/modifyMeeting";
import {
  clearMeeting,
  setAttendeeInfo,
  setCurrentMeeting,
  updateRosterMapping,
} from "../store/actions";
import getChimeUserType, { chimeUserTypes } from "util/getChimeUserType";
import { getJoinToken, getUserProfileByFuzionId } from "util/api";
import { useDispatch, useSelector } from "react-redux";

import ChatView from "../containers/ChatView/ChatView";
import DevicePermissionPrompt from "../DevicePermissionPrompt";
import DeviceSelection from "Components/DeviceSelection";
import Loader from "Components/Loader";
import Logger from "js-logger";
import MeetingControls from "../containers/MeetingControls";
import { MeetingDetails } from "../MeetingDetails/MeetingDetails";
import MeetingMetrics from "../containers/MeetingMetrics";
import MeetingRoster from "../containers/MeetingRoster";
import Navigation from "../containers/Navigation";
import OEPAnalytics from "Components/OEPAnalytics";
import { RealTimeSubscribeStateProvider } from "providers/RealtimeSubscribeProvider";
import { TOPICS } from "../constants";
import directMeetingStyle from "../scss/directMeeting.module.scss";
import getAnalyticsPage from "util/getAnalyticsPage";
import { useAppState } from "providers/AppStateProvider";
import { useMeasure } from "react-use";
import useMeetingEndRedirect from "hooks/useMeetingEndRedirect";
import { useNavigation } from "providers/NavigationProvider";

//Persist this for a minute to make sure there are no hiccups if multiple users join around the same time
const PERSIST_USER_JOIN_MESSAGE_MS = 60 * 1000;

const VideoConference = ({ meetId, hostProfile }: any) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const [videoTileGridRef, { height }] = useMeasure();
  const appState = useAppState();

  const {
    showNavbar,
    showRoster,
    showChat,
    setRefreshChat,
  }: any = useNavigation();

  /** @type {User} */
  const user = useSelector((state: any) => state.global.user);
  const guestProfiles = useSelector(
    (state: any) => state.profile.guestProfiles
  );
  const meeting = useSelector(
    (state: any) => state.chimeMeeting.currentMeeting
  );
  const attendeeInfo = useSelector(
    (state: any) => state.chimeMeeting.attendeeInfo
  );

  const rosterMapping = useSelector(
    (state: any) => state.chimeMeeting.rosterMapping
  );
  const [isLoading, setIsLoading] = useState(false);

  const [isSetup, setIsSetup] = useState(false);
  const [noToken, setNoToken] = useState(false);
  const [fetchingId, setFetchingId]: any = useState([]);
  const meetingManager = useMeetingManager();

  const audioVideo = useAudioVideo();
  const history = useHistory();

  const userType = getChimeUserType(user.fuzion_attendee_id, meeting);

  const isShowCase: boolean = meeting?.meetingType === "showcase";

  const { isVideoEnabled, toggleVideo } = useLocalVideo();
  const { isLocalUserSharing } = useContentShareState();
  const { toggleContentShare } = useContentShareControls();
  const getAttendeeName = useCallback(
    async (externalUserId) => {
      if (!guestProfiles) {
        return { name: null };
      }

      const mappedFuzionAttendeeId = rosterMapping[externalUserId];
      const user = guestProfiles.find(
        (x: { attendeeId: any }) =>
          x.attendeeId === (mappedFuzionAttendeeId || externalUserId)
      );

      Logger.log("mappedFuzionAttendeeId", mappedFuzionAttendeeId);

      if (!user && mappedFuzionAttendeeId) {
        const data = await getUserProfileByFuzionId(mappedFuzionAttendeeId);
        const { preferredName, firstName, lastName } = data.data.data;
        const name = `${preferredName || firstName} ${lastName}`;

        Logger.log("User Name", name, mappedFuzionAttendeeId);

        return {
          name: name.trim(),
        };
      } else if (!mappedFuzionAttendeeId) {
        return { name: null };
      }

      return {
        name: `${user.preferredName || user.firstName} ${user.lastName}`,
      };
    },
    [guestProfiles, rosterMapping]
  );
  const startMeeting = useCallback(async () => {
    setIsSetup(true);
    setIsLoading(true);
    if (meetId && user) {
      const name: string = `${user.preferredName || user.firstName} ${
        user.lastName
      }`;
      // @ts-ignore
      appState.setAppMeetingInfo(meetId, name);
      await meetingManager.start();
      setIsLoading(false);
    }
  }, [appState, meetId, meetingManager, user]);

  useMeetingEndRedirect();

  useEffect(() => {
    if (
      !meetingManager.meetingId &&
      meeting?.chimeMeeting?.Meeting &&
      attendeeInfo?.AttendeeId
    ) {
      const joinInfo = {
        meetingInfo: { ...meeting.chimeMeeting.Meeting },
        attendeeInfo,
      };
      meetingManager.join(joinInfo);
      //expected format of chime meeting info in other components
      meeting.chimeMeeting = joinInfo;
      dispatch(setCurrentMeeting(meeting));
    }
  }, [meeting, attendeeInfo, meetingManager, dispatch]);

  const onPromoteEvent = useCallback(
    (eventData) => {
      const promotedUser = JSON.parse(eventData.text());

      if (meetId && promotedUser.meetingId === meetId && meeting) {
        if (promotedUser.role === chimeUserTypes.host) {
          dispatch(
            setCurrentMeeting(
              addModeratorReplaceHost(meeting, promotedUser.fuzionAttendeeId)
            )
          );
        }

        if (promotedUser.role === chimeUserTypes.moderator) {
          dispatch(
            setCurrentMeeting(
              addModerator(meeting, promotedUser.fuzionAttendeeId)
            )
          );
        } else if (promotedUser.role === chimeUserTypes.speaker) {
          dispatch(
            setCurrentMeeting(
              addSpeaker(meeting, promotedUser.fuzionAttendeeId)
            )
          );
        }

        if (user.fuzion_attendee_id === promotedUser.fuzionAttendeeId) {
          setRefreshChat(true);
        }
      }
    },
    [meetId, meeting, dispatch, setRefreshChat, user]
  );

  const onDemoteEvent = useCallback(
    (eventData) => {
      const demotedUser = JSON.parse(eventData.text());

      if (meetId && demotedUser.meetingId === meetId && meeting) {
        if (demotedUser.role === chimeUserTypes.speaker) {
          dispatch(
            setCurrentMeeting(
              addSpeaker(
                removeModerator(meeting, demotedUser.fuzionAttendeeId),
                demotedUser.fuzionAttendeeId
              )
            )
          );
        } else if (demotedUser.role === chimeUserTypes.attendee) {
          dispatch(
            setCurrentMeeting(
              demoteToAttendee(meeting, demotedUser.fuzionAttendeeId)
            )
          );
        }

        if (user.fuzion_attendee_id === demotedUser.fuzionAttendeeId) {
          if (isVideoEnabled) {
            toggleVideo();
          }
          if (isLocalUserSharing) {
            toggleContentShare();
          }
          setRefreshChat(true);
        }
      }
    },
    [
      meetId,
      meeting,
      dispatch,
      setRefreshChat,
      user,
      isVideoEnabled,
      toggleContentShare,
      isLocalUserSharing,
      toggleVideo,
    ]
  );

  const onKickEvent = useCallback(
    (eventData) => {
      const data = JSON.parse(eventData.text());

      if (
        meetId &&
        data.meetingId === meetId &&
        meeting &&
        data.fuzionAttendeeId === user.fuzion_attendee_id
      ) {
        if (userType !== chimeUserTypes.host) {
          dispatch(setCurrentMeeting(removeJoinToken(meeting)));
          meetingManager.leave();
          setTimeout(() => {
            history.push("/removed");
          }, 500);
        }
      }
    },
    [meetId, meeting, user, history, userType, meetingManager, dispatch]
  );

  const onDisconnectEvent = useCallback(
    (chimeAttendeeId, present, externalUserId) => {
      if (!present) {
        const mappedFuzionAttendeeId = rosterMapping[externalUserId];
        if (mappedFuzionAttendeeId) {
          setCurrentMeeting(removeUser(meeting, mappedFuzionAttendeeId));
        }
      } else {
        //send out your randomId->fuzionAttendeeId mapping as you join
        if (audioVideo) {
          const data = {
            externalUserId: meeting.chimeMeeting.attendeeInfo.ExternalUserId,
            fuzionAttendeeId:
              meeting.chimeMeeting.attendeeInfo.fuzionAttendeeId,
          };

          audioVideo.realtimeSendDataMessage(
            TOPICS.userJoined,
            JSON.stringify(data),
            PERSIST_USER_JOIN_MESSAGE_MS
          );
        }
      }
    },
    [meeting, audioVideo, rosterMapping]
  );

  const loadAttendeeInfo = useCallback(
    async (meetId, userId) => {
      const attendeeResponse = await getJoinToken(meetId)(userId);
      const attendeeData = attendeeResponse?.data || null;
      /* !IMPORTANT
      ====================
      This chunk of code added solves the  issue of kicking an attendee out of a showcase if their screen refreshes, but might present security issues storing this data locally.
      */

      // No Token means we have reached the max cap
      if (!attendeeData) {
        setNoToken(true);
        return;
      }

      // No join token means we were not invited
      if (!attendeeData) {
        const cached = JSON.parse(
          // @ts-ignore
          localStorage.getItem(userId)
        );

        if (isShowCase && cached) {
          // but they were invited initially
          dispatch(setAttendeeInfo(cached));
          return;
        }
        return history.push("/meeting-not-invited");
      }

      if (
        attendeeData.code === 400 &&
        attendeeData.error?.message ===
          "You have been blocked from this meeting"
      ) {
        return history.push("/removed");
      }

      const {
        data: { data },
      }: any = attendeeResponse;

      if (isShowCase) {
        // @ts-ignore
        localStorage.setItem(userId, JSON.stringify(data));
      }

      dispatch(setAttendeeInfo(data));
    },
    [dispatch, history, isShowCase]
  );

  //fetch chime join token and other attendee info
  useEffect(() => {
    if (
      user &&
      meeting?.meetingStatus === "started" &&
      !fetchingId.includes(user.fuzion_attendee_id)
    ) {
      // Hold userIds that were fetched
      setFetchingId((prev: any) => [...prev, user.fuzion_attendee_id]);
      loadAttendeeInfo(meetId, user.fuzion_attendee_id);
    }
  }, [meetId, user, meeting, loadAttendeeInfo, fetchingId]);

  //once meeting info and attendee info are loaded, join chime meeting
  //note: this only loads the device setup screen, the user will still
  //click a "join meeting" button to go to the meeting content view

  // subscribe to message that a user has been promoted (to speaker or moderator)

  useEffect(() => {
    if (audioVideo) {
      audioVideo.realtimeSubscribeToReceiveDataMessage(
        TOPICS.promoteUser,
        onPromoteEvent
      );
    }

    return () => {
      if (audioVideo) {
        audioVideo.realtimeUnsubscribeFromReceiveDataMessage(
          TOPICS.promoteUser
        );
      }
    };
  }, [audioVideo, onPromoteEvent]);

  // subscribe to message that a user has been demoted (to attendee or speaker)
  useEffect(() => {
    if (audioVideo) {
      audioVideo.realtimeSubscribeToReceiveDataMessage(
        TOPICS.demoteUser,
        onDemoteEvent
      );
    }

    return () => {
      if (audioVideo) {
        audioVideo.realtimeUnsubscribeFromReceiveDataMessage(TOPICS.demoteUser);
      }
    };
  }, [audioVideo, onDemoteEvent]);

  // subscribe to message that a user has been kicked from meeting
  useEffect(() => {
    if (audioVideo) {
      audioVideo.realtimeSubscribeToReceiveDataMessage(
        TOPICS.kickUser,
        onKickEvent
      );
    }

    return () => {
      if (audioVideo) {
        audioVideo.realtimeUnsubscribeFromReceiveDataMessage(TOPICS.kickUser);
      }
    };
  }, [audioVideo, onKickEvent]);

  const userJoined = useCallback(
    (eventData) => {
      const data = JSON.parse(eventData.text());

      dispatch(updateRosterMapping(data));
    },
    [dispatch]
  );

  //when other user joins meeting, add their randomId->fuzionAttendeeId mapping
  useEffect(() => {
    if (audioVideo) {
      audioVideo.realtimeSubscribeToReceiveDataMessage(
        TOPICS.userJoined,
        userJoined
      );
    }

    return () => {
      if (audioVideo) {
        audioVideo.realtimeUnsubscribeFromReceiveDataMessage(TOPICS.userJoined);
      }
    };
  }, [audioVideo, userJoined]);

  // subscribe to message that user has joined/left meeting
  useEffect(() => {
    if (audioVideo) {
      audioVideo.realtimeSubscribeToAttendeeIdPresence(onDisconnectEvent);
    }

    return () => {
      if (audioVideo) {
        audioVideo.realtimeUnsubscribeToAttendeeIdPresence(onDisconnectEvent);
      }
    };
  }, [audioVideo, onDisconnectEvent]);

  // when un-mounting component, leave chime meeting
  useEffect(() => {
    return () => {
      if (meetingManager) {
        meetingManager.leave();
      }

      dispatch(clearMeeting());
    };
  }, [meetingManager, dispatch]);

  // provide functionality to retrieve attendee name for content nameplate display
  useEffect(() => {
    meetingManager.getAttendee = async (
      chimeAttendeeId: any,
      externalUserId: any
    ) => {
      const name = await getAttendeeName(externalUserId);

      if (!name.name) {
        return { name: null };
      }

      return name;
    };
  }, [getAttendeeName, meetingManager.getAttendee]);

  const hostName: any = hostProfile
    ? `${hostProfile.preferredName || hostProfile.firstName} ${
        hostProfile.lastName
      }`
    : null;

  if (noToken) {
    return <Redirect to="/meeting-full" />;
  }

  if (!meetingManager.meetingId || isLoading) {
    return (
      <div className={directMeetingStyle.styledLayout}>
        <Loader />
      </div>
    );
  }

  if (isSetup) {
    return (
      <Fragment>
        <UserActivityProvider>
          <div
            className={directMeetingStyle.styledLayout}
            // @ts-ignore
            shownav={showNavbar.toString()}
            showroster={(showRoster || showChat).toString()}
          >
            <RealTimeSubscribeStateProvider>
              <div
                ref={videoTileGridRef}
                className={directMeetingStyle.styledContent}
              >
                <MeetingMetrics />

                <VideoTileGrid
                  layout={"featured"}
                  style={{
                    overflowX: "hidden",
                  }}
                  noRemoteVideoView={
                    <MeetingDetails
                      hostProfile={hostProfile}
                      meeting={meeting}
                    />
                  }
                />

                <MeetingControls meeting={meeting} />
              </div>

              {showNavbar && <Navigation />}
              {showRoster && (
                <MeetingRoster height={height} meeting={meeting} />
              )}
              {showChat && <ChatView meeting={meeting} />}
            </RealTimeSubscribeStateProvider>
          </div>
        </UserActivityProvider>
      </Fragment>
    );
  }
  return (
    <Flex className={directMeetingStyle.styledLayout} layout="stack">
      <DevicePermissionPrompt />
      {meeting && (
        <Fragment>
          {/* @ts-ignore */}
          <Heading tag="h2" level={4} className={directMeetingStyle.headers}>
            {meeting?.meetingTitle} with {hostName}
          </Heading>
          {/* @ts-ignore */}
          <Heading tag="h2" level={5} className={directMeetingStyle.headers}>
            {meeting?.description}
          </Heading>
          {/* @ts-ignore */}
          <Heading tag="h2" level={4} className={directMeetingStyle.headers}>
            Choose Device Settings
          </Heading>
        </Fragment>
      )}
      <DeviceSelection />
      <Flex
        container
        alignItems="center"
        flexDirection="column"
        marginBottom="20px"
      >
        <OEPAnalytics
          componentType="Button"
          page={getAnalyticsPage(location.pathname)}
          url="Join meeting"
          componentName="Join meeting"
        >
          <button
            type="button"
            onClick={startMeeting}
            className={directMeetingStyle.primary}
          >
            Join
          </button>
        </OEPAnalytics>
      </Flex>
    </Flex>
  );
};
export default VideoConference;
