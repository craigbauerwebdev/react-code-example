export default function setNotificationNotNew(state, payload) {
  const updatedNotifications = [...state.notifications];
  const match = updatedNotifications.map((z) => {
    const copyItem = { ...z };

    if (copyItem.timestamp === payload.timestamp) {
      copyItem.new = false;
    }

    return copyItem;
  });

  return match;
}
