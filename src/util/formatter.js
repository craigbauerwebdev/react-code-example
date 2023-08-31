/**
 * formatUrl it formats a url to include https or http in the front.
 *
 * @param {string} url a string that will be added to the front http and https.
 *
 * @returns {string} returns the formatted url.
 */

const EXTERNAL_EXP = new RegExp("(http://|https://)");

export default function formatUrl(url) {
  if (!EXTERNAL_EXP.test(url)) {
    return `http://${url}`;
  }

  return url;
}

/**
 * isExternalUrl util is used to check if provided url external or not
 * @param {string} url a URL string to check
 * @returns {Boolean} return true if link is external, e.g. http/https
 *
 * Usage example:
 *
 * isExternalUrl("https://test"); // true
 * isExternalUrl("/"); //false
 * isExternalUrl(""); //false
 */

export function isExternalUrl(url) {
  return EXTERNAL_EXP.test(url);
}
