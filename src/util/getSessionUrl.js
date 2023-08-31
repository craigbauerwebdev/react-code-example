import checkForLiveStream from "./checkForLiveStream";
import generatedName from "./generatedName";

/**
 * Creates a live stream or session link.
 *
 * @param {Session} session - An object.
 *
 * @returns {string} link to live-stream or session
 */
export default function getSessionUrl({
  sessionName,
  sessionId,
  sessionVideoSource,
}) {
  return `/${
    checkForLiveStream({ sessionVideoSource }) ? "live-stream" : "sessions"
  }/${sessionId}/${generatedName(sessionName)}`;
}
