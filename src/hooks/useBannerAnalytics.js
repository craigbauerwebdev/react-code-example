import { saveAnalytic } from "Components/OEPAnalytics";
import { useEffect } from "react";
import useIsElementVisible from "./useIsElementVisible";
/**
 * Run Banner Analytics when in view item changes or comes into view
 * @param {Object} banner
 * @param {Node} visibilityRef
 * @param {Object} analytics
 * @param {string} analytics.page
 * @param {string} analytics.pageId
 */
export default function useBannerAnalytics(banner, { page, url }) {
  const inView = useIsElementVisible(banner);
  useEffect(() => {
    if (banner?.current && inView) {
      const analyticPayload = JSON.stringify({
        page,
        componentType: "Impression",
        url,
        componentName: "Single Banner",
      });
      saveAnalytic(JSON.parse(analyticPayload));
    }
  }, [banner, page, url, inView]);

  return inView;
}
