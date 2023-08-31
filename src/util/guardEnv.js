/**
 * Use to not load page is on stage or prod
 *
 * @param {boolean} prod
 * @param {boolean} stage
 *
 * @returns {boolean}
 */
export default function guardEvn(prod, stage) {
  if (stage && process.env.REACT_APP_ENV === "stage") {
    return true;
  }

  if (prod && process.env.REACT_APP_ENV === "prod") {
    return true;
  }

  return false;
}
