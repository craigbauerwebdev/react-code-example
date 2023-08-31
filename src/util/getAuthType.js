/**
 * Get user type
 * @param {object} user
 * @param {string} user.attendee_type_flag
 * @returns {string | null}
 */
export default function getAuthType(user) {
  // return "kids";
  // return "test";
  return user?.attendee_type_flag || null;
}
