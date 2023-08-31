/**
 *
 * @param {object} obj makes sure if the value is true.
 *
 * @returns {array}
 */
export default function selectedItem(obj) {
  return Object.entries(obj)
    .map(([key, value]) => (value === true ? key : null))
    .filter(Boolean);
}
