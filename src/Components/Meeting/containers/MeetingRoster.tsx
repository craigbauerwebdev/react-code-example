import {
  Roster as ChimeRoster,
  RosterHeader as ChimeRosterHeader,
  RosterGroup,
} from "../../../lib/chimeComponents";
import React, { useEffect, useState } from "react";

import { RosterItem } from "./RosterItem";
import { RosterProfile } from "types/meetings";
import renderSpeakerName from "util/renderSpeakerName";
import styled from "styled-components";
import { useMeetingParticipants } from "hooks/useMeetingParticipants";
import { useNavigation } from "providers/NavigationProvider";

const RosterHeader = styled(ChimeRosterHeader)``;
const Roster = styled(ChimeRoster)`
  height: ${(props) => (props.height ? props.height + "px" : "100%")};
  overflow: scroll;
  ${RosterHeader} {
    margin-bottom: 8px;
  }
`;
const MeetingRoster = ({ meeting, height }: any) => {
  // meeting
  const [filter, setFilter]: any = useState(null);
  const { closeRoster } = useNavigation();

  const [meetingModerators, setMeetingModerators]: any = useState([]);
  const [meetingSpeakers, setMeetingSpeakers]: any = useState([]);
  const [meetingAttendees, setMeetingAttendees]: any = useState([]);

  const {
    moderators,
    speakers,
    attendees,
    allParticipants,
  }: any = useMeetingParticipants();

  const handleFilter = (participant: RosterProfile) => {
    if (filter) {
      const name = renderSpeakerName(participant.guestProfile);

      return name.toLowerCase().includes(filter.trim().toLowerCase());
    }
    return true;
  };
  const handleSearch = (e: any) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    setMeetingModerators(moderators);
    setMeetingSpeakers(speakers);
    setMeetingAttendees(attendees);
  }, [
    moderators,
    speakers,
    attendees,
    meetingModerators,
    meetingSpeakers,
    meetingAttendees,
  ]);
  return (
    <Roster className="roster" height={height}>
      <RosterHeader
        searchValue={filter}
        onSearch={handleSearch}
        onClose={closeRoster}
        title={"Present"}
        badge={allParticipants?.length}
      />
      {meetingModerators?.length ? (
        <RosterGroup title="Meeting Admins">
          {meetingModerators
            .filter(handleFilter)
            .map(({ attendee, guestProfile }: any) => (
              <RosterItem
                guest={{ attendee, guestProfile }}
                meeting={meeting}
                key={`${attendee.externalUserId}_roster_item`}
              />
            ))}
        </RosterGroup>
      ) : null}
      {meetingSpeakers?.length ? (
        <RosterGroup title="Speakers">
          {meetingSpeakers
            .filter(handleFilter)
            .map(({ attendee, guestProfile }: any) => (
              <RosterItem
                guest={{ attendee, guestProfile }}
                meeting={meeting}
                key={`${attendee.externalUserId}_roster_item`}
              />
            ))}
        </RosterGroup>
      ) : null}
      {meetingAttendees?.length ? (
        <RosterGroup title="Attendees">
          {meetingAttendees
            .filter(handleFilter)
            .map(({ attendee, guestProfile }: any) => (
              <RosterItem
                guest={{ attendee, guestProfile }}
                meeting={meeting}
                key={`${attendee.externalUserId}_roster_item`}
              />
            ))}
        </RosterGroup>
      ) : null}
    </Roster>
  );
};
export default MeetingRoster;
