/**
 * @typedef {Object} DefaultEmbed
 *
 * @property {String[]} sessionLanguages
 * @property {String[]|null} defaultEmbed
 */

/**
 * @typedef {Object} Day
 *
 * @property {String} date
 * @property {Boolean} active
 */

/**
 * Extract the languages from session embed, since each session could potentially have a different language array
 * data.subSessionVideoSource = "English,451560218;French,451560218;Spanish,451560213;Portuguese,451560210;Arabic,451560172";
 *
 * @param {String[]} videoSource
 *
 * @returns {DefaultEmbed} if English is available set it as default else first language is set as default value
 */
export default function getSelectedLanguage(videoSource) {
  const sessionLanguages = [];

  videoSource.forEach((val) => {
    sessionLanguages.push(val.substr(0, val.indexOf(",")));
  });

  if (sessionLanguages.includes("English")) {
    // If a session has an embed for English, set it as default.
    return {
      sessionLanguages,
      defaultEmbed: videoSource
        ? videoSource.filter((langs) => langs.includes("English"))
        : null,
    };
  }

  // Pick the first language and set it as default.
  return {
    sessionLanguages,
    defaultEmbed: videoSource
      ? videoSource.filter((langs, index) => index === 0)
      : null,
  };
}
