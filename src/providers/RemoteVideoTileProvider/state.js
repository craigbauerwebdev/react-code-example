export var VideoTileActionType;
(function (VideoTileActionType) {
  VideoTileActionType[(VideoTileActionType["UPDATE"] = 0)] = "UPDATE";
  VideoTileActionType[(VideoTileActionType["REMOVE"] = 1)] = "REMOVE";
  VideoTileActionType[(VideoTileActionType["RESET"] = 2)] = "RESET";
})(VideoTileActionType || (VideoTileActionType = {}));
export const initialState = {
  tiles: [],
  tileIdToAttendeeId: {},
  attendeeIdToTileId: {},
  size: 0,
};
const removeProperty = (obj, property) => {
  const newState = Object.assign({}, obj);
  delete newState[property];
  return newState;
};
export function reducer(state, { type, payload }) {
  const { tiles, tileIdToAttendeeId, attendeeIdToTileId, size } = state;
  switch (type) {
    case VideoTileActionType.UPDATE: {
      const { tileId, attendeeId = "" } = payload;
      const tileStr = tileId.toString();
      const isPresent = tileIdToAttendeeId[tileStr];
      if (isPresent) {
        return state;
      }
      const newTiles = [...tiles, tileId];
      const tileIds = {
        ...tileIdToAttendeeId,
        [tileStr]: attendeeId,
      };
      const attendeeIds = {
        ...attendeeIdToTileId,
        [attendeeId]: tileId,
      };
      return {
        tiles: newTiles,
        tileIdToAttendeeId: tileIds,
        attendeeIdToTileId: attendeeIds,
        size: size + 1,
      };
    }
    case VideoTileActionType.REMOVE: {
      const { tileId } = payload;
      const attendeeId = tileIdToAttendeeId[tileId];
      const tileStr = tileId.toString();
      if (!attendeeId) {
        return state;
      }
      const newTiles = tiles.filter((id) => tileId !== id);
      const tileIds = removeProperty(tileIdToAttendeeId, tileStr);
      const attendeeIds = removeProperty(attendeeIdToTileId, attendeeId);
      return {
        tiles: newTiles,
        tileIdToAttendeeId: tileIds,
        attendeeIdToTileId: attendeeIds,
        size: size - 1,
      };
    }
    case VideoTileActionType.RESET: {
      return initialState;
    }
    default:
      throw new Error("Incorrect type in VideoProvider");
  }
}
//# sourceMappingURL=state.js.map
