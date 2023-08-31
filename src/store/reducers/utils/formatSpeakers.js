export default function formatSpeakers(speakers) {
  const formatSpeakers = speakers.map((speaker) => {
    if (speaker) {
      speaker.fullName = `${`${speaker.preferredName || speaker.firstName} ${
        speaker.lastName
      }`}`;
      speaker.givenName = `${speaker.firstName} ${speaker.lastName}`;
    }

    return speaker;
  });

  return formatSpeakers;
}
