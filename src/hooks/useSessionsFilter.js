import { useEffect, useState } from "react";

import { pageTitles } from "./useGetPageByPathname";

/**
 * Only display and filter the data for a specific session page ie(On Demand)
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Sessions-Filters-for-page-specific-data
 * @param {Array} data
 * @param {string} type
 * @returns {Array | null}
 */
const useSessionsFilter = (data, type) => {
  const [sessionsData, setSessionsData] = useState(null);

  useEffect(() => {
    if (data) {
      switch (type) {
        case pageTitles.onDemand:
          return setSessionsData(data.filter((s) => !s.sessionVideoSource));
        default:
          return setSessionsData(data);
      }
    }

    setSessionsData(null);
  }, [data, type]);

  return sessionsData;
};

export default useSessionsFilter;
