import getChimeUserType, { chimeUserTypes } from "util/getChimeUserType";
import { useEffect, useState } from "react";

import { RosterProfile } from "types/meetings";
import useGuestProfiles from "./useGuestProfiles";
import useMappedRosterState from "./useMappedRosterState";
import { useSelector } from "react-redux";

export const useMeetingParticipants = () => {
  const meeting = useSelector(
    (state: any) => state.chimeMeeting.currentMeeting
  );

  const user = useSelector((state: any) => state.global.user);

  const { mappedRoster }: any = useMappedRosterState(); // Not using mapped roster seems to result in the meeting roster UI rendering 'loading' for attendee names

  const { loadProfiles }: any = useGuestProfiles();
  const guestProfiles = useSelector(
    (state: any) => state.profile.guestProfiles
  );
  const [existingRosterIds, setExistingRosterIds]: any = useState([]);
  const [allParticipants, setAllParticipants] = useState<RosterProfile[]>([]);
  const [attendees, setAttendees] = useState<RosterProfile[]>([]);
  const [speakers, setSpeakers] = useState<RosterProfile[]>([]);
  const [moderators, setModerators] = useState<RosterProfile[]>([]);

  useEffect(() => {
    if (mappedRoster?.length) {
      const mappedIds: any[] = mappedRoster.map(
        (z: any) => z?.fuzionAttendeeId
      );

      if (!existingRosterIds?.length) {
        setExistingRosterIds(mappedIds);

        console.count(
          "loadProfiles in useMeetingParticipants empty existing roster ids"
        );
        loadProfiles(mappedIds);
        return;
      }
      if (existingRosterIds?.length) {
        const diff = mappedIds.filter(
          (mappedId: any) => !existingRosterIds.includes(mappedId)
        );

        if (diff?.length) {
          console.count(
            "loadProfiles in useMeetingParticipants non empty existing roster ids"
          );

          setExistingRosterIds((existingRosterIds: any) =>
            existingRosterIds?.length
              ? [...existingRosterIds, ...diff]
              : [...diff]
          );

          loadProfiles(diff);
        }
      }
    }
  }, [loadProfiles, mappedRoster, existingRosterIds]);

  useEffect(() => {
    if (mappedRoster?.length && guestProfiles?.length) {
      setAllParticipants(
        mappedRoster?.map((attendee: RosterProfile["attendee"]) => {
          let guestProfile = guestProfiles.find(
            (z: { attendeeId: any }) =>
              z.attendeeId === attendee.fuzionAttendeeId
          );

          attendee.role = getChimeUserType(attendee?.fuzionAttendeeId, meeting);
          attendee.isHost = meeting?.host === attendee.fuzionAttendeeId;
          attendee.isCurrentUser =
            user?.fuzion_attendee_id === attendee.fuzionAttendeeId;
          return {
            attendee,
            guestProfile,
          };
        })
      );
    }
  }, [guestProfiles, mappedRoster, meeting, user]);

  useEffect(() => {
    const filterByType = (guests: any[], type: any, typeTwo?: any) =>
      guests.filter((z: { attendee: { fuzionAttendeeId: any } }) => {
        if (typeTwo) {
          return (
            getChimeUserType(z.attendee.fuzionAttendeeId, meeting) === type ||
            getChimeUserType(z.attendee.fuzionAttendeeId, meeting) === typeTwo
          );
        }
        return getChimeUserType(z.attendee.fuzionAttendeeId, meeting) === type;
      });

    if (allParticipants?.length && meeting) {
      setSpeakers(filterByType(allParticipants, chimeUserTypes.speaker));
      setModerators(
        filterByType(
          allParticipants,
          chimeUserTypes.moderator,
          chimeUserTypes.host
        ).sort((a, b) => (a?.attendee?.isHost ? -1 : 1))
      );
      setAttendees(filterByType(allParticipants, chimeUserTypes.attendee));
    }
  }, [allParticipants, guestProfiles, meeting]);

  return { allParticipants, attendees, speakers, moderators };
};

