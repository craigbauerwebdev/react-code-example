import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { NotificationGroup } from "@progress/kendo-react-notification";
import NotificationsForPopup from "./NotificationsForPopup";
import NotificationsMeetings from "./NotificationsMeetings";
import { dataTypes } from "store/utils/dataTypes";
import { getMeetings } from "Components/Profile/store/actions";
import { getPayload } from "store/actions";
import lodash from "lodash";
import notificationBannerStyles from "./scss/notification-banner.module.scss";
import { profileLookupKey } from "Components/Profile/store/utils/profileLookupKey";
import { retrievedPayloads } from "store/utils/retrievedPayloads";
import useUserNotifications from "hooks/useUserNotifications";

// import meetings from "util/staticData/dummyData/meetings";

// const dummyMeetingData = meetings;

// https://github.com/Klowd/onlineeventpro-product-ui/wiki/Notification-Banner
const NotificationBanner = () => {
  const dispatch = useDispatch();
  /**@type {Session[]} */
  const sessions = useSelector((state) => state.global.sessions);
  const notifications = useSelector((state) => state.profile.notifications);
  const permissions = useSelector((state) => state.global.permissions);
  const [newNotifications, setNewNotifications] = useState(null);
  const schedule = useSelector((state) => state.profile.schedule);
  /**@type {Meeting[]} */
  const meetings = useSelector((state) => state.profile.meetings);
  /**@type {Meeting[]} */
  const [meetingsNotificationsList, setMeetingsNotificationsList] = useState(
    null
  );
  /**@type {Meeting[]} */
  const [displayList, setDisplayList] = useState();
  /**@type {Meeting[]} */
  const meetingNotifications = useUserNotifications(
    meetingsNotificationsList,
    5
  );
  const [newNotification, setNewNotification] = useState(false);
  const updateDisplayList = (id) => {
    setDisplayList((prevState) =>
      prevState.filter((item) => item.sessionId !== id)
    );
  };
  const setUpNotification = useCallback(
    (activeKeys = []) => {
      // Create user notifications from users schedule data.
      let userMeetings = [];
      let userSessions = [];

      if (
        !lodash.isEmpty(schedule.meetings) &&
        meetings &&
        meetings.length > 0
      ) {
        /**
         * Only use meeting that the users has not declined.
         * schedule.meetings should hold an array of meeting ids that the user has not declined.
         * Also remove meeting that have already display as a notifications.
         */
        userMeetings = meetings
          .filter((meeting) => schedule.meetings.includes(meeting.sessionId))
          .filter((meeting) => !activeKeys.includes(meeting.sessionId));
      }

      if (schedule.sessions && !lodash.isEmpty(schedule.sessions) && sessions) {
        /**
         * Only use sessions that the users has add to the schedule.
         * schedule.sessions should hold an array of session ids that the user has add to there schedule.
         * Also remove sessions that have already display as a notifications.
         */
        userSessions = sessions
          .filter((s) => schedule.sessions.includes(`${s.sessionId}`))
          .filter((session) => !activeKeys.includes(session.sessionId));
      }

      setMeetingsNotificationsList([...userMeetings, ...userSessions]);
    },
    [schedule, meetings, sessions]
  );

  useEffect(() => {
    if (!sessions) {
      dispatch(getPayload(dataTypes.sessions));
    }
  }, [sessions, dispatch]);

  // Get meeting data.
  useEffect(() => {
    if (
      schedule.meetings &&
      !retrievedPayloads.has(profileLookupKey.meetings)
    ) {
      dispatch(getMeetings(schedule.meetings, profileLookupKey.meetings));
    }
  }, [schedule.meetings, dispatch]);

  /**
   * Watch for meeting changes.
   * This should run when a new meeting has been made
   * Also when you have been add to a meeting
   */
  useEffect(() => {
    if (meetings && meetings.length > 0) {
      setUpNotification();
    }
  }, [meetings, schedule.meetings, setUpNotification]);

  /**
   * This will run when we have a notification to display.
   * Display notification are in meetingNotifications
   */
  useEffect(() => {
    if (meetingNotifications && meetingNotifications.length > 0) {
      setDisplayList(meetingNotifications);
      // Recall setUpNotification with current notifications removed from list
      setUpNotification(
        meetingNotifications.map((meeting) => meeting.sessionId)
      );
    }
  }, [meetingNotifications, setUpNotification]);

  useEffect(() => {
    if (notifications) {
      setNewNotifications(notifications.filter((z) => z.new));
    }
  }, [notifications, setNewNotifications]);
  useEffect(() => {
    if (newNotifications) {
      setNewNotification(
        newNotifications.some((x) => {
          return x.new && x.type === "NewMention" ? true : false;
        })
      );
    }
  }, [newNotifications]);
  if (
    (newNotifications && newNotifications.length > 0) ||
    (displayList && displayList.length > 0)
  ) {
    return (
      <div className={notificationBannerStyles.holder}>
        {newNotifications && (
          <NotificationGroup
            className={notificationBannerStyles.notificationGroup}
          >
            {/* This is use for all notifications that come for the Notifications API */}
            {newNotification &&
            [true, false].includes(permissions.allowNetworking) ? (
              <NotificationsForPopup newNotifications={newNotifications} />
            ) : (
              permissions.allowNetworking && (
                <NotificationsForPopup newNotifications={newNotifications} />
              )
            )}
          </NotificationGroup>
        )}
        {/* This is for non push notifications messages ie notifications that are made in the UI and not serverless */}
        {displayList &&
          displayList.length > 0 &&
          displayList.map((notification) => (
            <NotificationGroup
              className={notificationBannerStyles.notificationGroup}
              key={notification.sessionId}
            >
              <NotificationsMeetings
                meeting={notification}
                filterList={updateDisplayList}
              />
            </NotificationGroup>
          ))}
      </div>
    );
  }

  return null;
};

export default React.memo(NotificationBanner);
