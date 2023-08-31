/**
 * Board has changed now we update.
 * @param {array} badges
 * @param {string} id
 */
export default function updateActiveBoard(badges, id) {
  return badges.map((badge) => {
    badge.active = badge.id === id;
    return badge;
  });
}
