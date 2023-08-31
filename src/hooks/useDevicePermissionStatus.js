import { useEffect, useState } from "react";

import { useMeetingManager } from "lib/chimeComponents.js";

export default function useDevicePermissionStatus() {
  let meetingManager = useMeetingManager();
  let _a = useState("UNSET"),
    permission = _a[0],
    setPermission = _a[1];

  useEffect(
    function () {
      const callback = function (updatedPermission) {
        setPermission(updatedPermission);
      };

      meetingManager.subscribeToDevicePermissionStatus(callback);

      return function () {
        meetingManager.unsubscribeFromDevicePermissionStatus(callback);
      };
    },
    [meetingManager, setPermission]
  );
  return permission;
}
