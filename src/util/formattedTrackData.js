/**
 * List of Tracks
 *
 * @param {Object} session
 * @param {string} session.sessionTrack
 *
 * @returns {string|null} List of all tracks as a string
 */

export default function formattedTrackData({ sessionTrack }) {
  if (sessionTrack) {
    return sessionTrack.toString().split(",").join(", ");
  }

  return null;
}
