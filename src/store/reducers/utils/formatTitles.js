import lodash from "lodash";
/**
 * Format data from Liferay
 * @param {object} data payload from Liferay
 */
export default function formatTitles(data) {
  const hasNoData = lodash.isEmpty(data);

  if (!hasNoData) {
    data.displaySubLabelImageOnTiles =
      data.displaySubLabelImageOnTiles.toLowerCase() === "yes";
  }

  return data;
}
