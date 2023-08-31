/**
 * Make speaker user id
 *
 * @param {object} speaker
 *
 * @returns {string|null} speaker user name with out @ or ~
 */
export default function getGeneratedSpeakerId(speaker) {
  if (speaker?.eventUserId) {
    return speaker.eventUserId.replace("@", "~");
  }

  return null;
}
