/** it check if the devices where the website is running is IOS.
 * @returns {Boolean} a flag saying if the devices is IOS returns true else false.
 */
export default function checkForiOSDevices() {
  const iOSDevices = [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod",
  ];

  return navigator.platform && iOSDevices.includes(navigator.platform);
}
