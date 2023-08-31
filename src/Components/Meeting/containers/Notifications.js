import {
  NotificationGroup,
  useNotificationState,
} from "../../../lib/chimeComponents";

import React from "react";

const Notifications = () => {
  const { notifications } = useNotificationState();
  return notifications.length
    ? React.createElement(NotificationGroup, null)
    : null;
};
export default Notifications;
//# sourceMappingURL=Notifications.js.map
