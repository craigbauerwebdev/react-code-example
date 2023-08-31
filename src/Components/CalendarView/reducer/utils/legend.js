import lodash from "lodash";

// Make calendar hash map for colors
export const legendMap = new Map([
  ["Education Session", "#67c134"],
  ["Livestream", "#10b0e6"],
  ["OnDemand", "#91e0ed"],
  ["Showcase", "#0b5a6b"],
  ["Session Showcase", "#0b5a6b"],
]);

export default function getLegend(data) {
  // Make calendar legend with colors
  const legend = lodash
    .sortBy(
      lodash.unionBy(data.map((event) => event.sessionType.sessionTypeName))
    )
    .map((legend) => ({
      name: legend,
      color: legendMap.get(legend),
    }));

  return legend;
}
