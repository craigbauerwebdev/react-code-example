/**
 * generatedName receives a string and replaces all spaces " " with - and removes anything that is not a number or a-z with "".
 *
 * @param {string} name any string.
 *
 * @returns {string} string without spaces and any char that is not a-z or 0-9.
 */
export default function generatedName(name) {
  let cleanName = "";
  if (name) {
    cleanName = name.replace(/ /g, "-").replace(/[^a-zA-Z0-9-_]/g, "");
  }

  if (cleanName.length === 0) {
    cleanName = "_";
  }

  return cleanName;
}
