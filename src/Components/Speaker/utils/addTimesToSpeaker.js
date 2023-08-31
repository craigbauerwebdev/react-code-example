export function addTimes(speakers, sessions) {
  if (!speakers || !sessions) {
    return null;
  }
  const formatedSpeakers = speakers.map((speaker) => {
    let timeList = [];
    speaker.sessions &&
      speaker.sessions.forEach((session) => {
        const sessionWithId = sessions.find((s) => s.sessionId === session);
        if (sessionWithId) {
          timeList.push(sessionWithId.sessionStart);
          speaker.sessionStart = sessionWithId.sessionStart || null;
          speaker.featuredSessions = sessionWithId.featuredSession;
        }
      });
    speaker.sessionStartList = timeList;
    return speaker;
  });
  return formatedSpeakers;
}
