import generatedName from "util/generatedName";

/**
 * Make session link
 *
 * @param {Session} props
 *
 * @returns {string} session ulr
 */
export default function getSessionLink(
  { sessionId, sessionName, sessionVideoSource },
  showcaseSession
) {
  const prefix = showcaseSession
    ? "showcases"
    : sessionVideoSource
    ? "live-stream"
    : "sessions";

  return `/${prefix}/${sessionId}/${generatedName(sessionName)}`;
}
