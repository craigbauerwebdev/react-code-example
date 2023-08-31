/**
 * Sort exhibitors by name
 *
 * @param {object} a
 * @param {object} b
 *
 * @returns {number} sort value for name
 */
export default function sortExhibitors(a, b) {
  if (a.exhibitor_name?.toLowerCase() < b.exhibitor_name?.toLowerCase()) {
    return -1;
  }

  if (a.exhibitor_name?.toLowerCase() > b.exhibitor_name?.toLowerCase()) {
    return 1;
  }

  return 0;
}
