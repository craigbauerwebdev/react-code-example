import renderSpeakerName from "./renderSpeakerName";

/**
 * Make a string of all unique speakers for a subsession
 *
 * @param {array} subSessions
 *
 * @returns {string} list of all speakers
 */
export default function getSpeakerNames(subSessions) {
  if (!subSessions) {
    return null;
  }

  const allSpeakers = [
    ...new Set(
      subSessions
        .flatMap((subsession) => subsession.presenters)
        .filter(Boolean)
        .map(renderSpeakerName)
    ),
  ].join(", ");
  return allSpeakers;
}
