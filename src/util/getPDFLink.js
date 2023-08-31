import ConfigService from "services/ConfigService";
/**
 * Replaces \\\ with / for url path
 *
 * @param {string} filePath
 *
 * @returns {string} cleaned path
 */
export function cleanPath(filePath) {
  return filePath.replace(/\\/g, "/");
}

/**
 * Make url for file
 *
 * @param {string} filePath
 *
 * @returns {string} url to file
 */

export default function getPDFLink(filePath) {
  return `https://assets.onlineeventapp.com/${
    ConfigService.runValues.fileviewerAsset
  }/${cleanPath(filePath)}`;
}
