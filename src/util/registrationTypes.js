/**
 * Group user types into arrays so you can guard site access based on there user type
 */
export const registrationTypes = {
  groupA: ["kids"], // User Groups
  groupB: ["test"],
};

/**
 * Check to see if value is in group type
 * @param {array} group registration array of user types
 * @param {string} userType user type
 * @returns {[boolean]]}
 */
export function inGroup(group, userType) {
  if (userType) {
    return group.map((regTypes) => regTypes.includes(userType));
  }

  return [false];
}

export default {
  registrationTypes,
  inGroup,
};
