import getChimeUserType, { chimeUserTypes } from "util/getChimeUserType";
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

export const useCurrentUser = (meeting) => {
  const user = useSelector((state) => state.global.user);
  const chimeRole = getChimeUserType(user?.fuzion_attendee_id, meeting);
  const host = user.attendeeId === meeting?.host;
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (meeting) {
      setRole({
        isHost: !!(chimeRole === chimeUserTypes.host || host),
        isAttendee: chimeRole === chimeUserTypes.attendee,
        isModerator: chimeRole === chimeUserTypes.moderator,
        isSpeaker: chimeRole === chimeUserTypes.speaker,
      });
    }
  }, [chimeRole, host, meeting, user]);

  return { ...role, user };
};
