/**
 * checkForSafariMac checks if devices is an imac and running on safari.
 * @returns {Boolean} returns a boolean if the devices where the site runs is safari.
 */
export default function checkForSafariMac() {
  const isSafari =
    navigator.vendor &&
    navigator.vendor.indexOf("Apple") > -1 &&
    navigator.userAgent &&
    navigator.userAgent.indexOf("CriOS") === -1 &&
    navigator.userAgent.indexOf("FxiOS") === -1;

  return navigator.platform && isSafari && navigator.platform === "MacIntel";
}
