import { useEffect, useState } from "react";

import { PresentAttendee } from "types/meetings";
import { useActiveSpeakersState } from "lib/chimeComponents";
import { useMeetingParticipants } from "./useMeetingParticipants";

export type ActiveTiles = {
  [index: string]: PresentAttendee;
};
export const MAX_TILE_CAPACITY = 16;

export const mapToArray = (item: { [x: string]: any }) =>
  item && Object.keys(item).length
    ? Object.keys(item).map((key) => item[key])
    : [];

export const arrayToMap = (items: any[]): Record<string, unknown> =>
  items.reduce((acc, { index, ...rest }: any) => {
    acc[index] = {
      index,
      ...rest,
    };
    return acc;
  }, {});

export const getRandom = (arr: any[]) =>
  arr[Math.floor(Math.random() * arr.length)];
export const getRandomSelection = (arr: any[], amount: number) => {
  const loop = new Array(amount);
  const items = loop.map((i) => getRandom(arr));
  return items;
};

export const useActiveSpeaker = () => {
  const chimeSpeakerIds: any = useActiveSpeakersState();
  const { allParticipants }: any = useMeetingParticipants();
  const [activeSpeakers, setActiveSpeakers] = useState<PresentAttendee[]>([]);

  useEffect(() => {
    if (chimeSpeakerIds?.length && allParticipants?.length) {
      const presentAttendees = allParticipants.map(
        ({ attendee, guestProfile }: any) => ({ ...attendee, ...guestProfile })
      );
      setActiveSpeakers(
        chimeSpeakerIds.map((id: any) =>
          presentAttendees.find(
            (attendee: any) => id === attendee?.chimeAttendeeId
          )
        )
      );
    }
  }, [chimeSpeakerIds, allParticipants]);
  const [activeSpeaker, ...speakingAttendees] = activeSpeakers?.length
    ? activeSpeakers
    : [null, []];

  return { activeSpeaker, speakingAttendees };
};
