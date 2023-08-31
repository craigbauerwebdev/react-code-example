export const NOTIFICATION_TYPES = {
  MeetingCanceled: "MeetingCanceled",
};

export function checkForCanceledMeeting(meetingId) {
  return (n) => {
    const copyNotification = { ...n };

    copyNotification.canceled = copyNotification.actionId === meetingId;

    return copyNotification;
  };
}

export default function notificationsDataCheck(state, notifications) {
  const currentNotifications = state.notifications;

  if (currentNotifications) {
    if (notifications.type === NOTIFICATION_TYPES.MeetingCanceled) {
      const getAllMatches = currentNotifications.map(
        checkForCanceledMeeting(notifications.actionId)
      );

      return [...getAllMatches, notifications];
    }

    return [...currentNotifications, notifications];
  }

  return [notifications];
}
