/**
 * listModerators creates a string with the Moderators name using
 * firstName,
 * middleName,
 * lastName,
 * title,
 *
 * @param {object} options
 * @param {string} options.firstName
 * @param {string} options.middleName
 * @param {string} options.lastName
 * @param {string} options.title
 *
 * @returns {string} Full Name
 */
export default function listModerators({
  firstName,
  middleName,
  lastName,
  title,
}) {
  const first = firstName ? `${firstName} ` : "";
  const middle = middleName ? `${middleName} ` : "";
  const last = lastName ? `${lastName} ` : "";
  const moderatorTitle = title ? `${title}` : "";

  return `${first}${middle}${last}${moderatorTitle}`.trim();
}
