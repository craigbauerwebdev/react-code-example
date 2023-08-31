/**
 * Get url for current site
 *
 * @returns url if local host return localhost:port else return value from process.env.REACT_APP_EVENT_URL
 */
export default function getSiteUrl() {
  return window.location.hostname === "localhost"
    ? `http://localhost:${window.location.port}`
    : process.env.REACT_APP_EVENT_URL;
}
