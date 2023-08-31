import lodash from "lodash";
//TODO: I need a wiki.

/**
 * Check if data is out of sync
 * @param {Attendee} algoliaHit
 * @param {Attendee} profileData
 * @returns {boolean} if algoliaHit is equal to profileData
 */
const areEqual = (algoliaHit, profileData) => {
  /**
   * since the data in Algolia is eventually consistent, it could be out of sync with data from API
   * this will check if data is out of sync
   */
  return (
    algoliaHit.avatar === profileData.avatar &&
    algoliaHit.company === profileData.company &&
    algoliaHit.firstName === profileData.firstName &&
    algoliaHit.lastName === profileData.lastName &&
    algoliaHit.networking.allowChat.BOOL === profileData.networking.allowChat &&
    algoliaHit.networking.allowNetworking.BOOL ===
      profileData.networking.allowNetworking &&
    algoliaHit.networking.boothStaff.BOOL ===
      profileData.networking.boothStaff &&
    algoliaHit.networking.exhibitorAdmin.BOOL ===
      profileData.networking.exhibitorAdmin &&
    algoliaHit.networking.isVIP.BOOL === profileData.networking.isVIP &&
    algoliaHit.networking.networkingAdmin.BOOL ===
      profileData.networking.networkingAdmin &&
    algoliaHit.preferredName === profileData.preferredName &&
    algoliaHit.title === profileData.title &&
    algoliaHit.viewInNetworking === profileData.viewInNetworking
  );
};

/**
 * Override the algolia values
 * @param {Attendee} algoliaHit
 * @param {Attendee} profileData
 * @returns {Attendee}
 */
const overrideAlgoliaValues = (algoliaHit, profileData) => {
  /**
   * if data is out of sync, we can override the algolia values
   * with the most up to date value from the API
   */
  algoliaHit.avatar = profileData.avatar;
  algoliaHit.company = profileData.company;
  algoliaHit.firstName = profileData.firstName;
  algoliaHit.lastName = profileData.lastName;
  algoliaHit.networking.allowChat.BOOL = profileData.networking.allowChat;
  algoliaHit.networking.allowNetworking.BOOL =
    profileData.networking.allowNetworking;
  algoliaHit.networking.boothStaff.BOOL = profileData.networking.boothStaff;
  algoliaHit.networking.exhibitorAdmin.BOOL =
    profileData.networking.exhibitorAdmin;
  algoliaHit.networking.isVIP.BOOL = profileData.networking.isVIP;
  algoliaHit.networking.networkingAdmin.BOOL =
    profileData.networking.networkingAdmin;
  algoliaHit.preferredName = profileData.preferredName;
  algoliaHit.title = profileData.title;
  algoliaHit.viewInNetworking = profileData.viewInNetworking;

  return algoliaHit;
};

/**
 * override the algolia result
 *
 * @param {Attendee[]} overrides list of Attendees
 * @param {Attendee[]} hits list of Attendees
 * @returns {Object} object with hits and overrides ex. { hits: [], overrides: [] }
 */
export const applyOverrides = (overrides, hits) => {
  /**
   * when profile data is updated from a page with algolia search results, we add that
   * attendeeId to a list of attendee's to check if we need to override the algolia result data
   * if the algolia data is currently out of sync, we will override it with the data provided
   * by the patch call
   */
  if (lodash.isEmpty(overrides)) {
    return {
      hits,
      neededOverrides: [],
    };
  }

  const overriddenHits = [...hits];
  const neededOverrides = [];

  overriddenHits.forEach((hit) => {
    const overrideMatch = overrides.find(
      (z) => z.fuzionAttendeeId === hit.fuzionAttendeeId
    );

    if (overrideMatch && !areEqual(hit, overrideMatch)) {
      hit = overrideAlgoliaValues(hit, overrideMatch);
      neededOverrides.push(overrideMatch);
    }
  });

  return {
    hits: overriddenHits,
    neededOverrides,
  };
};
