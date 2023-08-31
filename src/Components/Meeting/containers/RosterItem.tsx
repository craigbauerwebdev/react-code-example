import { PresentAttendee, RosterProfile } from "types/meetings";
import React, { useEffect, useState } from "react";
import {
  RosterAttendee,
  useAttendeeStatus,
} from "../../../lib/chimeComponents";
import getChimeUserType, { chimeUserTypes } from "util/getChimeUserType";

import ProfileAvatar from "Components/Profile/ProfileAvatar";
import { VideoModerationDropdown } from "../VideoModerationDropdown";
import renderSpeakerName from "util/renderSpeakerName";
import { useSelector } from "react-redux";

export interface RosterItemProps {
  guest: RosterProfile;
  meeting: Meeting;
}

const RosterItem: React.SFC<RosterItemProps> = ({
  meeting,
  guest: { attendee, guestProfile },
}) => {
  /** @type {User} */
  const user = useSelector((state: any) => state.global.user);
  const [userRole, setUserRole] = useState(
    user && getChimeUserType(user.fuzion_attendee_id, meeting)
  );
  const currentAttendee: PresentAttendee = { ...attendee, ...guestProfile };

  const attendeeRole = getChimeUserType(
    currentAttendee?.fuzionAttendeeId,
    meeting
  );
  const attendeeStatus = useAttendeeStatus(currentAttendee?.chimeAttendeeId);

  const showMenu =
    [chimeUserTypes.host, chimeUserTypes.moderator].includes(userRole) &&
    currentAttendee.fuzionAttendeeId !== user.fuzion_attendee_id &&
    currentAttendee.fuzionAttendeeId !== meeting.host;

  useEffect(() => {
    const currentUserRole = getChimeUserType(user.fuzion_attendee_id, meeting);
    setUserRole(currentUserRole);
  }, [user, meeting]);
  const displayRole: any =
    attendeeRole === "HOST" || attendeeRole === "MODERATOR"
      ? attendeeRole
      : null;
  const subtitle: string = `${displayRole || ""} ${
    currentAttendee.isCurrentUser ? "(Me)" : ""
  }`;
  return (
    <RosterAttendee
      name={guestProfile ? renderSpeakerName(guestProfile) : "loading..."}
      subtitle={subtitle}
      extraIcon={
        <ProfileAvatar
          firstName={currentAttendee?.firstName}
          preferredName={currentAttendee?.preferredName}
          lastName={currentAttendee?.lastName}
          url={currentAttendee?.avatar}
          key={currentAttendee?.attendeeId}
          isSquare={false}
          size={20}
          isLink={false}
        />
      }
      attendeeId={currentAttendee?.chimeAttendeeId}
      menu={
        showMenu && (
          <VideoModerationDropdown meeting={meeting} attendee={attendee} />
        )
      }
      attendeeStatus={attendeeStatus}
    />
  );
};

export { RosterItem };
