/**
 * Get Video Ids
 *
 * @param {String[]} sessLanguageArray
 * @param {string[] defaultEmbed
 * @param {Boolean[]} fail
 *
 * @returns {String[]|Boolean[]}
 */
export default function getVideoIds(sessLanguageArray, defaultEmbed, fail) {
  // If there is only one embed code with/without language specified, set that embed as default and don't display the dropdown
  if (sessLanguageArray.length === 1) {
    return defaultEmbed ? defaultEmbed[0].split(",") : fail;
  }

  return defaultEmbed ? defaultEmbed[0].split(",").slice(1) : fail;
}
