/**
 * Detects the operating system currently in use and returns an OS slug.
 */
export function detectOperatingSystem() {
  let osDetected = "other";

  if (navigator?.appVersion?.indexOf("Win") !== -1) {
    osDetected = "microsoft";
  } else if (navigator?.appVersion?.indexOf("Mac") !== -1) {
    osDetected = "mac";
  } else if (navigator?.appVersion?.indexOf("X11") !== -1) {
    osDetected = "unix";
  } else if (navigator?.appVersion?.indexOf("Linux") !== -1) {
    osDetected = "linux";
  }

  return osDetected;
}

export function detectDevice() {
  let deviceDetected = "desktop";

  if (
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      navigator.userAgent.toLowerCase()
    )
  ) {
    deviceDetected = "mobile";
  }

  return deviceDetected;
}

export default {
  detectOperatingSystem,
  detectDevice,
};
