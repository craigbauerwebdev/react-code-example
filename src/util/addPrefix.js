/**
 * Add Prefix to user name
 *
 * @param {Session} session
 * @param {string} session.prefix
 * @param {string} name
 *
 * @returns {string} with prefix and name if there is a prefix
 */
export default function addPrefix({ prefix }, name) {
  // Has Prefix add it to the return
  if (prefix) {
    return `${prefix} ${name}`;
  }

  // No Prefix return just name
  return name;
}
