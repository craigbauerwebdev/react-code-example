import { useDispatch, useSelector } from "react-redux";

import { actionTypesNotification } from "Components/UserNotification/reducer";
import { getMeetingNotifications } from "Components/Profile/store/actions";
import lodash from "lodash";
import { meetingTypes } from "Components/UserNotification/util/meetingTypes";
import { retrievedPayloads } from "store/utils/retrievedPayloads";
import { useEffect } from "react";

// if notification is from websocket, we want to make an api call once for that notification
// in case details of the meeting have updated
const getNotificationLookupKey = (notification) => {
  if (isNotificationFromWebsocket(notification)) {
    return `notification-${notification.actionId}-${notification.timestamp}`;
  } else {
    return `meeting-${notification.actionId}`;
  }
};

const isNotificationFromWebsocket = (notification) => {
  return notification.timestamp && !notification.sk;
};

const useNotificationMeeting = (
  notification,
  notificationState,
  dispatchNotificationState
) => {
  const dispatch = useDispatch();
  const meetings = useSelector((state) => state.profile.meetings);

  useEffect(() => {
    if (
      notification &&
      (notification.type === meetingTypes.NEW_CHAT ||
        notification.type === meetingTypes.NEW_MENTION_LIVESTREAM ||
        notification.type === meetingTypes.NEW_MENTION)
    ) {
      return;
    }

    const meeting = meetings.find((z) => notification.actionId === z.meetingId);
    const lookupKey = getNotificationLookupKey(notification);
    if (!meeting || !retrievedPayloads.has(lookupKey)) {
      retrievedPayloads.set(lookupKey, true);
      //fetch the meeting
      dispatch(getMeetingNotifications(notification.actionId));
    } else if (
      !notificationState.matchedMeeting ||
      !lodash.isEqual(meeting, notificationState.matchedMeeting)
    ) {
      dispatchNotificationState({
        type: actionTypesNotification.SET_MATCHED_MEETING,
        payload: meeting,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    meetings?.length,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    notification?.length,
    dispatch,
    dispatchNotificationState,
    notificationState.matchedMeeting,
  ]);
};

export default useNotificationMeeting;
