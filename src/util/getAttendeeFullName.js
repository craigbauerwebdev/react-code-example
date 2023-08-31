/**
 * Make attendee full name.
 * If attendee has a preferred name use it over the first name.
 *
 * @param {Speaker} speaker
 *
 * @returns {string} (preferred name/ first name) last name
 */
export default function getAttendeeFullName({
  preferredName = null,
  firstName,
  lastName,
}) {
  return `${preferredName || firstName} ${lastName}`;
}
