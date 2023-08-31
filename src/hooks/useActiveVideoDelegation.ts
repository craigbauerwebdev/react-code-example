import { useAudioVideo, useRosterState } from "lib/chimeComponents";
import { useCallback, useEffect, useState } from "react";

// import { PresentAttendee, RosterProfile } from "types/meetings";
import { VideoTileState } from "amazon-chime-sdk-js";
import useRaisedHandAttendees from "./useRaisedHands";

const MAX_REMOTE_VIDEOS = 16;
export const useActiveVideoDelegation = () => {
  const audioVideo = useAudioVideo();
  const [visibleIndices, setVisibleIndices] = useState<{
    [index: string]: { boundAttendeeId: string };
  }>({});
  const raisedHandAttendees = useRaisedHandAttendees();
  const roster = useRosterState();

  const videoElements: HTMLVideoElement[] = [];
  const tiles: { [index: number]: number } = {};

  const acquireVideoIndex = useCallback((tileId: number): number => {
    for (let index = 0; index < MAX_REMOTE_VIDEOS; index += 1) {
      if (tiles[index] === tileId) {
        return index;
      }
    }
    for (let index = 0; index < MAX_REMOTE_VIDEOS; index += 1) {
      if (!(index in tiles)) {
        tiles[index] = tileId;
        return index;
      }
    }
    throw new Error("no tiles are available");
  }, []);

  const releaseVideoIndex = useCallback(
    (tileId: number): number => {
      for (let index = 0; index < MAX_REMOTE_VIDEOS; index += 1) {
        if (tiles[index] === tileId) {
          delete tiles[index];
          return index;
        }
      }
      return -1;
    },
    [tiles]
  );

  const numberOfVisibleIndices = Object.keys(visibleIndices).reduce<number>(
    (result: number, key: string) => result + (visibleIndices[key] ? 1 : 0),
    0
  );

  useEffect(() => {
    if (audioVideo) {
      audioVideo.addObserver({
        videoTileDidUpdate: (tileState: VideoTileState): void => {
          if (
            !tileState.boundAttendeeId ||
            tileState.localTile ||
            tileState.isContent ||
            !tileState.tileId
          ) {
            return;
          }
          const index = acquireVideoIndex(tileState.tileId);
          audioVideo.bindVideoElement(tileState.tileId, videoElements[index]);
          setVisibleIndices((previousVisibleIndices) => ({
            ...previousVisibleIndices,
            [index]: {
              boundAttendeeId: tileState.boundAttendeeId,
            },
          }));
        },
        videoTileWasRemoved: (tileId: number): void => {
          const index = releaseVideoIndex(tileId);
          setVisibleIndices((previousVisibleIndices) => ({
            ...previousVisibleIndices,
            [index]: null,
          }));
        },
      });
    }
  }, [acquireVideoIndex, audioVideo, releaseVideoIndex, videoElements]);

  // const getSize = () => {
  //   if (numberOfVisibleIndices >= 10) {
  //     return Size.Small;
  //   }
  //   if (numberOfVisibleIndices >= 5) {
  //     return Size.Medium;
  //   }
  //   return Size.Large;
  // };

  return {
    numberOfVisibleIndices,
    raisedHandAttendees,

    videoElements,

    tiles,
  };
};
