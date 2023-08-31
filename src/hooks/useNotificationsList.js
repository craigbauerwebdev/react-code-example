import { useEffect, useState } from "react";

import lodash from "lodash";
import useGuestProfiles from "hooks/useGuestProfiles";
import { useSelector } from "react-redux";

/**
 * Remove all blocked user from notifications
 *
 * @param {Notification[]} notifications
 * @returns {Notification[]}
 */
const useNotificationsList = (notifications) => {
  const blockedUsers = useSelector((state) => state.profile.blockedUsers);
  const blockedByUsers = useSelector((state) => state.profile.blockedByUsers);
  const mutedUsers = useSelector((state) => state.profile.mutedUsers);
  const { listWithGuestProfileData } = useGuestProfiles(
    notifications,
    "senderFuzionAttendeeId"
  );
  /**@type {[Notification[], Function]} */
  const [list, setList] = useState(null);

  useEffect(() => {
    if (listWithGuestProfileData) {
      const fullList = lodash.union([
        ...blockedUsers,
        ...blockedByUsers,
        ...mutedUsers,
      ]);
      const listData = listWithGuestProfileData
        .filter((n) => n.level !== "2")
        .filter((n) => !fullList.includes(n.senderFuzionAttendeeId));

      setList(listData);
    }
  }, [
    blockedUsers,
    blockedByUsers,
    mutedUsers,
    listWithGuestProfileData,
    notifications,
  ]);

  return list;
};

export default useNotificationsList;
