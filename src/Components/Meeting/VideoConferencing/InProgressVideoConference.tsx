import {
  MeetingProvider,
  NotificationProvider,
  lightTheme,
} from "lib/chimeComponents";
import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AppStateProvider } from "providers/AppStateProvider";
import ErrorProvider from "providers/ErrorProvider";
import Loader from "Components/Loader";
import { MEETING_TYPES } from "util/meetingTypes";
import Meta from "Components/Meta";
import { NavigationProvider } from "providers/NavigationProvider";
import Notifications from "Components/Meeting/containers/Notifications";
import { ThemeProvider } from "styled-components";
import VideoConference from "Components/Meeting/VideoConferencing/VideoConference";
import { addMeetingToHistory } from "util/meetingHistory";
import { fetchMeeting } from "util/api";
import formatMeetings from "store/reducers/utils/formatMeetings";
import { setCurrentMeeting } from "../store/actions";
import styles from "./scss/video-conferencing.module.scss";

export const Theme = ({ children }: any) => {
  return <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>;
};

const InProgressVideoConference = () => {
  const { id }: any = useParams();
  const dispatch = useDispatch();
  const permissions = useSelector((state: any) => state?.global?.permissions);
  /** @type {User} */
  const user = useSelector((state: any) => state.global.user);
  const [token, setToken]: any = useState(true);
  const [meeting, setMeeting]: any = useState(false);
  const [meetingLoaded, setMeetingLoaded]: any = useState(false);
  const guestProfiles = useSelector(
    (state: any) => state.profile.guestProfiles
  );
  const [hostProfile, setHostProfile]: any = useState(null);

  useEffect(() => {
    if (!meeting) {
      fetchMeeting(id).then((data) => {
        const [meeting] = formatMeetings(data.data);

        setMeeting(meeting);
        setMeetingLoaded(true);
        dispatch(setCurrentMeeting(data.data));
      });
    }
  }, [meeting, id, dispatch]);

  useEffect(() => {
    if (meeting && guestProfiles && !hostProfile) {
      const host = guestProfiles.find(
        (z: { attendeeId: any }) => z.attendeeId === meeting.host
      );
      /* @ts-ignore */
      const token = localStorage.getItem(user.fuzion_attendee_id);

      if (meeting.isMeetingFull) {
        setToken(token || false);
      }

      if (host) {
        setHostProfile(host);
      }
    }
  }, [meeting, guestProfiles, hostProfile, user]);

  useEffect(() => {
    if (meeting) {
      addMeetingToHistory(meeting.sessionId);
    }
  }, [meeting]);

  if (meeting && !token) {
    return <Redirect to="/meeting-full" />;
  }

  return (
    <div className={styles.meetingWrapper}>
      {hostProfile && meetingLoaded ? (
        <AppStateProvider>
          <Theme>
            <Meta
              pageTitle={`${
                meeting.meetingType === MEETING_TYPES.SHOW_CASE
                  ? "Live Showcase"
                  : "Video Meeting"
              }`}
              pageDescription={meeting.sessionName}
            />
            <NotificationProvider>
              {permissions.allowNetworking &&
                permissions.allowNotifications && <Notifications />}
              <ErrorProvider>
                <MeetingProvider simulcastEnabled>
                  <NavigationProvider>
                    <VideoConference
                      hostProfile={hostProfile}
                      meetId={meeting.sessionId}
                    />
                  </NavigationProvider>
                </MeetingProvider>
              </ErrorProvider>
            </NotificationProvider>
          </Theme>
        </AppStateProvider>
      ) : (
        <Loader />
      )}
    </div>
  );
};
export default InProgressVideoConference;
