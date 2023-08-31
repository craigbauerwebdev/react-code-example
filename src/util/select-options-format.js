export default function getFormattedOptionsForSelect(jsonObject) {
  const formattedJSONObject = Object.entries(jsonObject).map((entry) => ({
    value: entry[0],
    label: entry[1],
  }));
  return formattedJSONObject;
}
//# sourceMappingURL=select-options-format.js.map
