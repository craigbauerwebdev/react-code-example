import lodash from "lodash";

/**
 * Compare one array of object to an other array of objects.
 *
 * @param {[]} x array to compare with
 * @param {[]} y array to compare with
 *
 * @returns {Boolean} array are the same or not
 */
export default function isArrayEqual(x, y) {
  if (x?.length && y?.length) {
    const test = lodash.differenceWith(x, y, lodash.isEqual);

    return lodash.isEmpty(test);
  }
  return lodash.isEmpty(x) && lodash.isEmpty(y);
}
