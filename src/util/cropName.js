import React from "react";

/**
 * Crops a string based on the number passed in as cropSize.
 *
 * @param {string} name string that need to be cropped.
 * @param {number} cropSize number of character allow in the string anything bigger gets cropped.
 * @param {string} endString how the string should be eclipsed.
 *
 * @returns {string | JSX.Element} a string or JSX.Element that is cropped to a limit.
 */
export default function cropName(name, cropSize = 40, endString = "...") {
  return name?.length > cropSize ? (
    <span title={name}>
      {name.slice(0, cropSize).trim()}
      {endString}
    </span>
  ) : (
    name
  );
}
