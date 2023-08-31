/**
 * classNames util provides functionality to render classess conditionally to a DOM element
 * @param {Object.<string,Boolean>} classess An object with keys as the CSS class and value which returns a boolean value (true/false)
 * @return {string} space seperated string of classes
 */
export default (classes) =>
  Object.entries(classes)
    .filter(([_, value]) => value)
    .map(([key]) => key)
    .join(" ");
