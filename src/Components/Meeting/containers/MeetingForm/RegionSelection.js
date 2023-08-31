import { FormField, Select } from "../../../../lib/chimeComponents";
import React, { useEffect } from "react";

import { AVAILABLE_AWS_REGIONS } from "../../../../constants";
import getFormattedOptionsForSelect from "../../../../util/select-options-format";

const regionalOptions = [
  { value: "", label: "Select a region" },
  ...getFormattedOptionsForSelect(AVAILABLE_AWS_REGIONS),
];
const RegionSelection = ({ setRegion, region }) => {
  useEffect(() => {
    // Avoid memory leak issue
    // https://www.debuggr.io/react-update-unmounted-component/
    let mounted = true;
    async function getNearestRegion() {
      if (region) {
        return;
      }
      try {
        const res = await fetch(`https://nearest-media-region.l.chime.aws`, {
          method: "GET",
        });
        if (!res.ok) {
          throw new Error("Server error");
        }
        const data = await res.json();
        const nearestRegion = data.region;
        if (mounted) {
          setRegion((region) => region || nearestRegion);
        }
      } catch (e) {
        // console.error("Could not fetch nearest region: ", e.message);
      }
    }
    getNearestRegion();
    return () => {
      mounted = false;
    };
  }, [setRegion, region]);
  return React.createElement(FormField, {
    field: Select,
    options: regionalOptions,
    onChange: (e) => {
      setRegion(e.target.value);
    },
    value: region,
    label: "Meeting region",
  });
};
export default RegionSelection;
//# sourceMappingURL=RegionSelection.js.map
