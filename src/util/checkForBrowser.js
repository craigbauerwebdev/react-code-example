import checkForSafariMac from "util/checkForSafariMac";

export function checkForCookieLearnMore() {
  let url = null;

  // Internet Explorer 6-11
  const isIE = /*@cc_on!@*/ false || !!document.documentMode;

  // Edge 20+
  const isEdge = !isIE && !!window.StyleMedia;

  // Chrome 1 - 71
  const isChrome =
    !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

  // Firefox 1.0+
  const isFirefox = typeof InstallTrigger !== "undefined";

  const isSafariMac = checkForSafariMac();

  if (isIE) {
    url = "https://www.toolwire.com/cookies-ie11/";
  } else if (isEdge) {
    url =
      "https://support.microsoft.com/en-us/help/4555686/temporarily-allow-cookies-and-site-data-in-microsoft-edge";
  } else if (isFirefox) {
    url =
      "https://support.mozilla.org/en-US/kb/websites-say-cookies-are-blocked-unblock-them";
  } else if (isSafariMac) {
    url =
      "https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac";
  } else if (isChrome) {
    url =
      "https://support.google.com/accounts/answer/61416?co=GENIE.Platform%3DDesktop&hl=en";
  }

  return url;
}

/**
 * Detects the browser currently in use and returns a browser slug.
 */
export function detectBrowser() {
  let browserDetected = "other";

  // Internet Explorer 6-11
  const isIE = /*@cc_on!@*/ false || !!document.documentMode;

  // Edge 20+
  const isEdge = !isIE && !!window.StyleMedia;

  // Chrome 1 - 71
  const isChrome =
    !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

  // Firefox 1.0+
  const isFirefox = typeof InstallTrigger !== "undefined";

  const isSafariMac = checkForSafariMac();

  if (isIE) {
    browserDetected = "ie";
  } else if (isEdge) {
    browserDetected = "edge";
  } else if (isFirefox) {
    browserDetected = "firefox";
  } else if (isSafariMac) {
    browserDetected = "safari";
  } else if (isChrome) {
    browserDetected = "chrome";
  }

  return browserDetected;
}

export default {
  checkForCookieLearnMore,
  detectBrowser,
};
