export default function setNetworkingNotification(state, payload) {
  if (state.notifications) {
    return {
      ...state,
      notifications: [payload, ...state.notifications],
    };
  }

  return {
    ...state,
    notifications: [payload],
  };
}
