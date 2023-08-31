export default function markAsRead(state, notification) {
  const notifications = [...state.notifications];
  const updateNotifications = notifications.map((n) => {
    const copyItem = { ...n };
    if (copyItem.sk === notification.sk) {
      copyItem.notificationRead = 1;
    }

    return copyItem;
  });

  return {
    ...state,
    notifications: [...updateNotifications],
  };
}
