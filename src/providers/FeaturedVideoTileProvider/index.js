import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useMeetingManager } from "../MeetingProvider";
import { useRemoteVideoTileState } from "../RemoteVideoTileProvider";
const TILE_TRANSITION_DELAY = 1500;
const FeaturedTileContext = createContext(null);
const FeaturedVideoTileProvider = ({ children }) => {
  const meetingManager = useMeetingManager();
  const { attendeeIdToTileId } = useRemoteVideoTileState();
  const activeTileRef = useRef(null);
  const [activeTile, setActiveTile] = useState(null);
  const timeout = useRef(null);
  const pendingAttendee = useRef(null);
  const value = useMemo(
    () => ({
      tileId: activeTile,
    }),
    [activeTile]
  );

  useEffect(() => {
    const activeSpeakerCallback = (activeAttendees) => {
      const activeId = activeAttendees[0];
      if (activeId === pendingAttendee.current) {
        return;
      }
      pendingAttendee.current = activeId;
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      if (!activeId) {
        activeTileRef.current = null;
        setActiveTile(null);
        return;
      }
      const tileId = attendeeIdToTileId[activeId];
      if (!tileId) {
        if (activeTileRef.current) {
          timeout.current = setTimeout(() => {
            activeTileRef.current = null;
            setActiveTile(null);
          }, TILE_TRANSITION_DELAY);
        }
        return;
      }
      if (tileId === activeTileRef.current) {
        return;
      }
      if (!activeTileRef.current) {
        activeTileRef.current = tileId;
        setActiveTile(tileId);
      } else {
        timeout.current = setTimeout(() => {
          activeTileRef.current = tileId;
          setActiveTile(tileId);
        }, TILE_TRANSITION_DELAY);
      }
    };
    meetingManager.subscribeToActiveSpeaker(activeSpeakerCallback);
    return () =>
      meetingManager.unsubscribeFromActiveSpeaker(activeSpeakerCallback);
  }, [attendeeIdToTileId, meetingManager]);

  return React.createElement(
    FeaturedTileContext.Provider,
    { value: value },
    children
  );
};
function useFeaturedTileState() {
  const state = useContext(FeaturedTileContext);
  if (!state) {
    throw new Error(
      "useFeaturedTileState must be used within an FeaturedVideoTileProvider"
    );
  }
  return state;
}
export { FeaturedVideoTileProvider, useFeaturedTileState };
//# sourceMappingURL=index.js.map
