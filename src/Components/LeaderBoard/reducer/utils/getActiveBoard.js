/**
 * Get the board id and name.
 * @param {array} badges
 */
export default function getActiveBoard(badges) {
  // Check to see if payload is null
  if (badges) {
    const [activeBoard] = badges
      .filter((badge) => badge.active)
      .map((badge) => ({ id: badge.id, name: badge.title }));

    // set active board id and board name to local store
    return {
      activeBoard: activeBoard.id,
      boardName: activeBoard.name,
    };
  }

  // No data
  return {
    activeBoard: null,
    boardName: null,
  };
}
