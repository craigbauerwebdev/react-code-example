import { PresentAttendee, RosterProfile } from "types/meetings";
import {
  useContentShareState,
  useRemoteVideoTileState,
} from "lib/chimeComponents";
import { useEffect, useState } from "react";

// import { useCurrentUser } from "./useCurrentUser";
import { useMeetingParticipants } from "./useMeetingParticipants";

export const useVideoConference = () => {
  const { allParticipants } = useMeetingParticipants();
  const { attendeeIdToTileId } = useRemoteVideoTileState();
  // const { isHost } = useCurrentUser(meeting);

  // const { isVideoEnabled: isUsingLocalVideo } = useLocalVideo();

  const {
    tileId: currentlySharedTileId,
    // isLocalUserSharing,
    sharingAttendeeId,
  } = useContentShareState();

  // const currentUserIsShowCaseHost = isShowCase && isHost;

  const remoteHost: any = allParticipants?.length
    ? {
        ...allParticipants?.find(
          (participant: RosterProfile) => participant.attendee.isHost
        ),
      }
    : { chimeAttendeeId: null };

  const host = remoteHost
    ? { ...remoteHost?.attendee, ...remoteHost?.guestProfile }
    : null;

  // const filterForCurrentUser = useCallback(
  //   (attendee: PresentAttendee) => {
  //     if (
  //       (isLocalUserSharing ||
  //         isUsingLocalVideo ||
  //         currentUserIsShowCaseHost) &&
  //       attendee.isCurrentUser
  //     ) {
  //       return false;
  //     }
  //     return true;
  //   },
  //   [currentUserIsShowCaseHost, isLocalUserSharing, isUsingLocalVideo]
  // );

  const [presentAttendees, setPresentAttendees] = useState<PresentAttendee[]>(
    () =>
      allParticipants?.length
        ? allParticipants.map(({ guestProfile, attendee }: RosterProfile) => {
            const tileId =
              attendeeIdToTileId &&
              attendeeIdToTileId[attendee.chimeAttendeeId];

            return { ...attendee, ...guestProfile, tileId };
          })
        : // .filter(filterForCurrentUser)
          []
  );

  const chimeIdOfSharer = sharingAttendeeId
    ? sharingAttendeeId.replace("#content", "")
    : null; // Yea, I couldn't believe it either

  const theAttendeeWhoIsSharing =
    currentlySharedTileId && chimeIdOfSharer
      ? presentAttendees.find(
          (attendee: any) => attendee.chimeAttendeeId === chimeIdOfSharer
        )
      : null;

  useEffect(() => {
    setPresentAttendees(
      allParticipants?.map(({ guestProfile, attendee }) => {
        const tileId =
          attendeeIdToTileId && attendeeIdToTileId[attendee.chimeAttendeeId];
        const shareTileId =
          currentlySharedTileId && chimeIdOfSharer === attendee.chimeAttendeeId
            ? currentlySharedTileId
            : null;

        return { ...attendee, ...guestProfile, tileId, shareTileId };
      })
      // .filter(filterForCurrentUser)
    );
  }, [
    attendeeIdToTileId,
    allParticipants,
    // filterForCurrentUser,
    currentlySharedTileId,
    chimeIdOfSharer,
  ]);

  return {
    presentAttendees,
    // currentUserIsShowCaseHost,
    host,

    theAttendeeWhoIsSharing,
  };
};
