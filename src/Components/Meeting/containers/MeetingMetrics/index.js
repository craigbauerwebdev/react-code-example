import React from "react";
import { StyledMetrics } from "./Styled";
import { useBandwidthMetrics } from "../../../../lib/chimeComponents";
import { useNavigation } from "../../../../providers/NavigationProvider";
function formatMetric(metric) {
  return metric ? `${metric} Kbps` : null;
}
const MeetingMetrics = () => {
  const { showMetrics } = useNavigation();
  return showMetrics ? React.createElement(BandwidthMetrics, null) : null;
};
const BandwidthMetrics = () => {
  const {
    availableIncomingBandwidth,
    availableOutgoingBandwidth,
  } = useBandwidthMetrics();
  return React.createElement(
    StyledMetrics,
    null,
    React.createElement("p", { className: "metric title" }, "Bandwidth"),
    React.createElement(
      "p",
      { className: "metric" },
      "Incoming: ",
      formatMetric(availableIncomingBandwidth) || "unavailable"
    ),
    React.createElement(
      "p",
      { className: "metric" },
      "Outgoing: ",
      formatMetric(availableOutgoingBandwidth) || "unavailable"
    )
  );
};
export default MeetingMetrics;
//# sourceMappingURL=index.js.map
