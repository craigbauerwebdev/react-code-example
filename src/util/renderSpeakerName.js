/**
 * renderSpeakerName creates a string with the speakers name using
 * preferredName
 * firstName,
 * middleName,
 * lastName,
 * suffix
 *
 * @param {Presenters | any} session
 *
 * @returns {string} Full Name
 */
export default function renderSpeakerName({
  firstName,
  middleName,
  lastName,
  suffix,
  preferredName,
}) {
  const preferred = preferredName ? `${preferredName} ` : "";
  const first = firstName ? `${firstName} ` : "";
  const middle = middleName ? `${middleName} ` : "";
  const last = lastName ? `${lastName} ` : "";
  const suff = suffix ? `${suffix}` : "";
  const name = `${preferred || first}${middle}${last}${suff}`.trim();

  /**
   * this works in webinar search if copied into the search bar
   * the prefered name makes it a missmatch in search
   **/
  //return `${first} ${last}`.trim();
  return name;
}
